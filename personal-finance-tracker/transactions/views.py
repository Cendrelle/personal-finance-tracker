from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Category, Transaction
from .serializers import CategorySerializer, TransactionSerializer
from django.db.models import Sum
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TransactionFilter
from django.db.models.functions import TruncMonth
from rest_framework.decorators import action
# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]

    filterset_class = TransactionFilter

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        transactions = self.get_queryset()

        total_income = transactions.filter(
            type='INCOME'
        ).aggregate(
            total=Sum('amount')
        )['total'] or 0

        total_expense = transactions.filter(
            type='EXPENSE'
        ).aggregate(
            total=Sum('amount')
        )['total'] or 0

        balance = total_income - total_expense

        return Response({
            'total_income': total_income,
            'total_expense': total_expense,
            'balance': balance,
        })

    @action(detail=False, methods=['get'])
    def monthly_summary(self, request):
        transactions = self.get_queryset()

        monthly_data = (
            transactions
            .annotate(month=TruncMonth('date'))
            .values('month', 'type')
            .annotate(total=Sum('amount'))
            .order_by('month')
        )

        result = {}

        for item in monthly_data:
            month = item['month'].strftime('%Y-%m')
            transaction_type = item['type']
            total = item['total']

            if month not in result:
                result[month] = {
                    'income': 0,
                    'expense': 0,
                    'balance': 0,
                }

            if transaction_type == 'INCOME':
                result[month]['income'] = total
            else:
                result[month]['expense'] = total

            result[month]['balance'] = (
                result[month]['income']
                - result[month]['expense']
            )

        return Response(result)

    @action(detail=False, methods=['get'])
    def category_summary(self, request):
        transactions = self.get_queryset().filter(type='EXPENSE')

        data = (
            transactions
            .values('category__name')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )

        total_expenses = transactions.aggregate(
            total=Sum('amount')
        )['total'] or 0

        result = []

        for item in data:
            percentage = (
                item['total'] / total_expenses * 100
                if total_expenses > 0
                else 0
            )

            result.append({
                'category': item['category__name'],
                'total': item['total'],
                'percentage': round(percentage, 2),
            })

        return Response(result)