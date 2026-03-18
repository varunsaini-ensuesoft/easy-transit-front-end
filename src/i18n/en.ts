import { TranslationMessages } from 'react-admin';
import englishMessages from 'ra-language-english';

export const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: 'Monthly Revenue',
            month_history: '30 Day Revenue History',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            all_reviews: 'See all reviews',
            new_customers: 'New Customers',
            all_customers: 'See all customers',
            pending_orders: 'Pending Orders',
            order: {
                items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to the react-admin e-commerce demo',
                subtitle:
                    "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                ra_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
        menu: {
            sales: 'Sales',
            work: 'Work',
            configuration: 'Configuration',

            // ---
            catalog: 'Catalog',
            customers: 'Customers',
        },
        events: {
            review: {
                title: 'Posted review on "%{product}"',
            },
            order: {
                title: 'Ordered 1 poster |||| Ordered %{smart_count} posters',
            },
        },
    },
    resources: {
        products: {
            name: 'Product |||| Products',
        },
        customers: {
            name: 'Customer |||| Customers',
            fields: {
                orders: 'Orders',
                first_seen: 'First seen',
                full_name: 'Name',
                groups: 'Segments',
                last_seen: 'Last seen',
                last_seen_gte: 'Visited Since',
                name: 'Name',
                total_spent: 'Total spent',
                password: 'Password',
                confirm_password: 'Confirm password',
                stateAbbr: 'State',
            },
            filters: {
                last_visited: 'Last visited',
                today: 'Today',
                this_week: 'This week',
                last_week: 'Last week',
                this_month: 'This month',
                last_month: 'Last month',
                earlier: 'Earlier',
                has_ordered: 'Has ordered',
                has_newsletter: 'Has newsletter',
                group: 'Segment',
            },
            fieldGroups: {
                identity: 'Identity',
                address: 'Address',
                stats: 'Stats',
                history: 'History',
                password: 'Password',
                change_password: 'Change Password',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch:
                    'The password confirmation is not the same as the password.',
            },
        },

        // ------

        clients: {
            name: 'Client |||| Clients',
            fields:{
                name: "Name",
                vatNumber : "VAT Number",
                address: "Address"
            }
        },
        
        orders: {
            name: 'Order |||| Orders',
            amount: '1 order |||| %{smart_count} orders',
            title: 'Order %{num}',
            fields: {
                created_at: 'Created at',
                num: 'Number',
                clientNum: 'Client number',
                issueDate: 'Issue date',
                clientId : 'Client',
                status : 'Status'
            },
            section: {
                order: 'Order',
                customer: 'Customer',
                shipping_address: 'Shipping Address',
                items: 'Items',
                total: 'Totals',
            },
        },

        productionFiles : {
            name: 'Production File |||| Production Files',
            fields: {
                created_at: 'Created at',
                orderId: 'Order',
                status : 'Status'
            },
        },

        deliveryNotes : {
            name: 'Delivery Note |||| Delivery Notes',
            fields: {
                created_at: 'Created at',
                orderId: 'Order',
                clientId: 'Client',
                productionFileId : 'Production File',
                status : 'Status'
            },
        },

        invoices: {
            name: 'Invoice |||| Invoices',
            fields: {
                created_at: 'Created at',
                orderId: 'Number',
                clientId: 'Client',
                num : 'Number',
                dueDate : 'Due Date',
                paymentStatus : 'Payment Status',
                status : 'Status'
            },
        },

        users: {
            name: 'User |||| Users',
            fields: {
                firstname: 'First name',
                lastname: 'Last name',
                fullname: 'Full name',
                email: 'Email',
                password: 'Password',
            },
        },

        settings: {
            name: 'Settings |||| Settings',
            fields: {
                param: 'Parameter',
                value: 'Value',
            },
        },
        
        categories: {
            name: 'Category |||| Categories',
            fields: {
                products: 'Products',
            },
        },
        reviews: {
            name: 'Review |||| Reviews',
            amount: '1 review |||| %{smart_count} reviews',
            relative_to_poster: 'Review on poster',
            detail: 'Review detail',
            fields: {
                customer_id: 'Customer',
                order_id: 'Order',
                product_id: 'Product',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        segments: {
            name: 'Segment |||| Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
    },
};

export default customEnglishMessages;
