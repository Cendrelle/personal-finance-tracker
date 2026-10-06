from rest_framework import serializers
from .models import Category,  Transaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id',
            'amount',
            'type',
            'category',
            'description',
            'date',
        ]
        
    def validate_category(self, category):
        user = self.context['request'].user

        if category.user != user:
            raise serializers.ValidationError(
                "You cannot use this category."
            )

        return category