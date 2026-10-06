import requests
import pandas as pd
import matplotlib.pyplot as plt


BASE_URL = "http://127.0.0.1:8000"

USERNAME = "TON_USERNAME"
PASSWORD = "TON_MOT_DE_PASSE"


# 1. Authentification
login_response = requests.post(
    f"{BASE_URL}/api/token/",
    json={
        "username": USERNAME,
        "password": PASSWORD
    }
)

login_response.raise_for_status()

tokens = login_response.json()
access_token = tokens["access"]

print("Authentification réussie !")


# 2. Récupération des transactions
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(
    f"{BASE_URL}/api/transactions/",
    headers=headers
)

response.raise_for_status()

data = response.json()

print("Données reçues depuis Django :")
print(data)


# 3. JSON → DataFrame Pandas
df = pd.DataFrame(data)

print("\nDataFrame :")
print(df)


# 4. Nettoyage des données
df["amount"] = pd.to_numeric(df["amount"])
df["date"] = pd.to_datetime(df["date"])


# 5. Analyse
income = df[df["type"] == "INCOME"]["amount"].sum()

expenses = df[df["type"] == "EXPENSE"]["amount"].sum()

balance = income - expenses


print("\n--- ANALYSE ---")
print("Revenus :", income)
print("Dépenses :", expenses)
print("Solde :", balance)


# 6. Analyse par catégorie
expenses_by_category = (
    df[df["type"] == "EXPENSE"]
    .groupby("category")["amount"]
    .sum()
    .sort_values(ascending=False)
)

print("\nDépenses par catégorie :")
print(expenses_by_category)


# 7. Visualisation
expenses_by_category.plot(
    kind="bar",
    title="Dépenses par catégorie"
)

plt.xlabel("Catégorie")
plt.ylabel("Montant")
plt.tight_layout()
plt.show()