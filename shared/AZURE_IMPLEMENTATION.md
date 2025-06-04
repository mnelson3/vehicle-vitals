---

# Migrating from Firebase to Azure in Your React App

This guide helps you transition your React app from Firebase to Azure services, covering authentication, database, and notifications.

---

## 1. Azure Service Equivalents

| Firebase Feature      | Azure Equivalent                    |
|----------------------|-------------------------------------|
| Authentication       | Azure Active Directory B2C (MSAL.js) |
| Firestore Database   | Azure Cosmos DB (via backend API)    |
| Cloud Messaging      | Azure Notification Hubs (via backend API) |

---

## 2. Azure Authentication with MSAL.js

**Install MSAL:**
```bash
npm install @azure/msal-browser
```

**Setup in `shared/azureConfig.js`:**
```js
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'YOUR_AZURE_AD_B2C_CLIENT_ID',
    authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_signupsignin1',
    redirectUri: 'http://localhost:3000', // Adjust as needed
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
```

**Usage Example:**
```js
import { msalInstance } from './azureConfig';

async function signIn() {
  await msalInstance.loginPopup();
  // Use msalInstance.getAllAccounts() to get user info
}
```

> **Note:** You need to set up an Azure AD B2C tenant and user flows. See [Azure AD B2C Docs](https://docs.microsoft.com/azure/active-directory-b2c/) for setup help.

---

## 3. Accessing Azure Cosmos DB

Direct access from the browser is **not recommended**. Instead, create a backend API (Node.js, .NET, etc.) to interface with Cosmos DB.

**Example client function:**
```js
export async function getDataFromCosmosDB() {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
}
```

**Backend responsibilities:**
- Authenticate requests
- Query Cosmos DB
- Return data to frontend

> **See:** [Azure Cosmos DB Node.js SDK](https://docs.microsoft.com/azure/cosmos-db/nosql/sdk-node)

---

## 4. Sending Notifications with Azure Notification Hubs

Again, use your backend API to interact with Notification Hubs.

**Example client function:**
```js
export async function sendNotification(payload) {
  const response = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to send notification');
  return response.json();
}
```

**Backend responsibilities:**
- Authenticate requests
- Send notifications via Azure Notification Hubs SDK

> **See:** [Azure Notification Hubs Docs](https://docs.microsoft.com/azure/notification-hubs/)

---

## 5. Example: `shared/azureConfig.js`

```js
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'YOUR_AZURE_AD_B2C_CLIENT_ID',
    authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_signupsignin1',
    redirectUri: 'http://localhost:3000',
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export async function getDataFromCosmosDB() {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
}

export async function sendNotification(payload) {
  const response = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to send notification');
  return response.json();
}
```

---

## 6. Further Steps

- Set up Azure AD B2C for Authentication
- Deploy a backend API (Node.js/Express recommended) to handle database and notification requests
- Configure Azure Cosmos DB and Notification Hubs in your Azure Portal

---

## References

- [Azure AD B2C Documentation](https://docs.microsoft.com/azure/active-directory-b2c/)
- [MSAL.js Docs](https://docs.microsoft.com/azure/active-directory/develop/tutorial-v2-javascript-spa)
- [Azure Cosmos DB SDK for Node.js](https://docs.microsoft.com/azure/cosmos-db/nosql/sdk-node)
- [Azure Notification Hubs Guide](https://docs.microsoft.com/azure/notification-hubs/)

---

**Need help with backend setup or sample code? Let us know!**
