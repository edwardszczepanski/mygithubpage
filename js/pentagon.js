ctx = $("#pentagon");
var data = {
    labels: ["Consumer Price Index", "Weather", "Yelp", "Average Household Income", "Average Rent"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(204, 204, 0, 0.8)",
            borderColor: "rgba(45,71,57,1)",
            pointBackgroundColor: "rgba(45,71,57,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(0, 0, 204, 0.8)",
            borderColor: "rgba(187,206, 168, 1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96]
        }
    ]
};
new Chart(ctx, {
    type: "radar",
    data: data,
    options: {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
    }
});
