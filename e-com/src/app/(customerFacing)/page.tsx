import db from "@/db/db";

const getMostPopularProducts = () => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } }, // to sort by counting more to less
        take: 6, // to display to certain number
    });
};

const getNewestProducts = () => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6,
    });
};

const Homepage = () => {
    return <div>Homepage</div>;
};
export default Homepage;
