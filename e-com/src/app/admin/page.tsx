import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const getSalesData = async () => {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCent: true },
        _count: true,
    });
    return {
        amount: (data._sum.pricePaidInCent || 0) / 100,
        numberOfSales: data._count,
    };
};

// const getUserData = async () => {
//     const userCount = await db.user.count();
//     const orderData = await db.order.aggregate({
//         _sum: { pricePaidInCent: true },
//     });
//     return {
//         userCount,
//         averageValuePerUser:
//             userCount === 0
//                 ? 0
//                 : (orderData._sum.pricePaidInCent || 0) / userCount / 100,
//     };
// };
// * Switch to below block of code so we don't need 2 awaits
const getUserData = async () => {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCent: true },
        }),
    ]);
    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaidInCent || 0) / userCount / 100,
    };
};

const AdminDashboard = async () => {
    const [salesData, userData] = await Promise.all([
        getSalesData(),
        getUserData(),
    ]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="Sales"
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title="Customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average Value`}
                body={formatNumber(userData.userCount)}
            />
        </div>
    );
};
export default AdminDashboard;

type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
};
const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    );
};
