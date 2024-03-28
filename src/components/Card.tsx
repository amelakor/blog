type CardProps = {
    children: React.ReactNode;
};
export const Card = ({ children }: CardProps) => {
    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: `2px 0px 5px 0px rgba(204,204,204,1)`,
                padding: " 20px",
                marginBottom: "20px",
            }}
        >
            {children}
        </div>
    );
};
