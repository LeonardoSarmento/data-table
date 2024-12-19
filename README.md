# DataTable for front-end applications

Template for DataTable to be used for front-end applications

Visit the site at [DataTable](https://datatable.leosarmento.com)

## Portfolio Technologies

### **Features**

- Sidebar menu
- DataTable
- URL Search Params
- Async State Management
- Typed Router

### **Main Technologies**

- **Language**: `TypeScript` (~5.6.2)
- **Table**: `@tanstack/react-table` (^8.20.6)
- **Router**: `@tanstack/router-plugin` (^1.91.1)
- **State Management**: `@tanstack/react-query` (^5.62.8)
- **Validation**: `zod` (^3.24.1)
- **Styling**: `tailwindcss` (^3.4.15)
- **Lint** : `eslint` (^9.13.0)
- **Formatting** : `prettier` (^3.3.3)

---

# DataTable

A robust and customizable DataTable component with advanced features for filtering, pagination, and more.

Visit the demo at [@leosarmento/DataTable](https://datatable.leosarmento.com)  
GitHub Repository: [@LeonardoSarmento/data-table](https://github.com/LeonardoSarmento/data-table)  
Connect on LinkedIn: [@leosarmento/LinkedIn](https://linkedin.com/in/leonardo-araujo-sarmento)  
Explore Portfolio: [@leosarmento/portfolio](https://leosarmento.com)

---

## DataTable Technologies

### **Main Technologies**

- **Language**: `TypeScript` (~5.6.2)
- **Table**: `@tanstack/react-table` (^8.20.6)
- **Router**: `@tanstack/router-plugin` (^1.91.1)
- **State Management**: `@tanstack/react-query` (^5.62.8)
- **Validation**: `zod` (^3.24.1)
- **Styling**: `tailwindcss` (^3.4.15)

### **Auxiliary Technologies**

- **Components**: `@shadcn/ui` & `@radix-ui`

---

## Features

- **Row Actions**: Perform actions on individual rows.
- **Filtering State Management**: Save filtering state in the URL.
- **Pagination**: Built-in pagination for managing large datasets.
- **Faceted Filters**: Advanced filtering options for precise data queries.
- **Export to CSV**: Export table data to a CSV file.
- **Customizable Columns**: Manage visible columns dynamically.
- **Debounced Input**: Optimized input handling for filtering.
- **Select All Rows**: Bulk actions for selected rows.
- **Typed Data**: Type-safe structure for table data and queries.
- **Fake API Integration**: Example API setup for easy testing and customization.

---

## How to Access the DataTable Code

To get the **DataTable** component and use it in your project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/LeonardoSarmento/data-table.git
   ```

2. Navigate to the `src` folder:

   ```bash
   cd data-table/src
   ```

3. Locate the **DataTable** code:

   Inside the `src` folder, you will find a subfolder named `feature`. Within it, there's a folder called `DataTable` containing all the necessary code:

   ```
   src/
   └── feature/
    └── DataTable/
        ├── common/                # Common reusable components
        ├── components/            # Core DataTable components
        ├── constants/             # Table labels and static constants
        ├── fake-api/              # Mock API for testing
        ├── hooks/                 # Custom hooks
        ├── lib/                   # Utility functions
        ├── types/                 # Type definitions
        ├── users/                 # User-related actions and types
        ├── README.md              # Documentation
        └── tanstack-table.d.ts    # Typed Table definitions
   ```

4. Copy or import the `DataTable` folder into your project.

---

## Usage

Once the **DataTable** folder is in your project, you can import and use the `DataTable` component:

```tsx
import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Header from '@components/header';

import DataTable from '@/feature/DataTable/common/data-table';
import { userColumns } from '@/feature/DataTable/users/user-columns';
import { DataTableToolbar } from '@/feature/DataTable/users/user-table-toolbar';
import { queryOptionsUserTable } from '@/feature/DataTable/users/queries/useTableUser';
import { UserFilters } from '@/feature/DataTable/users/types/User';

export const Route = createFileRoute('/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: async ({ context: { queryClient }, deps: filters }) => {
    const userData = await queryClient.ensureQueryData(queryOptionsUserTable(filters));
    return {
      userData,
      crumb: 'User DataTable',
    };
  },
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const { userData } = Route.useLoaderData();
  const columns = useMemo(() => userColumns, []);

  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable data={userData} columns={columns} toolbar={DataTableToolbar} routeId={Route.id} />
    </>
  );
}
```

---

## How to Use

To learn how to integrate DataTable into your project, check out the documentation at [@LeonardoSarmento/data-table](https://github.com/LeonardoSarmento/data-table).

---

Happy Coding! 🎉
