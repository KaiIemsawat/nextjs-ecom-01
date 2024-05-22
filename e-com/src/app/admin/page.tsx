import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AdminDashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="sales" subtitle="test" body="body" />
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
