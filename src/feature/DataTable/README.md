# Data Table

A robust and customizable DataTable component with advanced features for filtering, pagination, and more.

Visit the demo at [@leosarmento/DataTable](https://datatable.leosarmento.com)  
GitHub Repository: [@LeonardoSarmento/data-table](https://github.com/LeonardoSarmento/data-table)  
Connect on LinkedIn: [@leosarmento/LinkedIn](https://linkedin.com/in/leonardo-araujo-sarmento)  
Explore Portfolio: [@leosarmento/portfolio](https://leosarmento.com)

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

## Folder Structure

The `DataTable` code is located under `src/feature/DataTable` with the following structure:

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

---

## Technologies

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

For detailed integration and customization, visit the documentation at [@LeonardoSarmento/DataTable](https://github.com/LeonardoSarmento/data-table).

---

Happy Coding! 🎉
