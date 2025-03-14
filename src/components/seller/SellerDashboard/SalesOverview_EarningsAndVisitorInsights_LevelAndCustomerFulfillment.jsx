/* eslint-disable react/prop-types */
// import React from "react";
import "./SalesOverview_EarningsAndVisitorInsights_LevelAndCustomerFulfillment.css";

const SalesOverview_EarningsAndVisitorInsights_LevelAndCustomerFulfillment = (
  { lastMonthAmount = "$4,087", thisMonthAmount = "$5,506" ,
  
    yAxisLabels = ["500", "400", "300", "200", "100", "0"],
    xAxisLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  }
) => {
  return (
    <div className="overview-container">
      {/* Sales & Level Section */}
      <div className="sales-level-section">
        {/* Today's Sales */}
        <div className="sales-card">
          <div className="card-header">
            <h2>Today&apos;s Sales</h2>
            <p className="subtitle">Sales Summary</p>
          </div>

          <div className="sales-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="23"
                  height="26"
                  viewBox="0 0 23 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.7034 6.95138L11.7277 1.08333L1.75201 6.95138V18.6875L11.7277 24.5555L21.7034 18.6875V6.95138Z"
                    stroke="#FEB95A"
                    strokeWidth="1.95"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.03326 13.993V16.3403M11.7277 11.6458V16.3403V11.6458ZM16.4222 9.2986V16.3403V9.2986Z"
                    stroke="#FEB95A"
                    strokeWidth="1.95"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
              </div>
              <div className="stat-details">
                <h3>$5k</h3>
                <p>Total Sales</p>
                <span className="trend-up">+10% from yesterday</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="21"
                  height="25"
                  viewBox="0 0 21 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4987 2.69315H18.2645C18.5609 2.69315 18.8451 2.81204 19.0547 3.02367C19.2643 3.2353 19.382 3.52233 19.382 3.82163V22.4415C19.382 22.7408 19.2643 23.0279 19.0547 23.2395C18.8451 23.4511 18.5609 23.57 18.2645 23.57H2.61951C2.32313 23.57 2.03889 23.4511 1.82932 23.2395C1.61975 23.0279 1.50201 22.7408 1.50201 22.4415V3.82163C1.50201 3.52233 1.61975 3.2353 1.82932 3.02367C2.03889 2.81204 2.32313 2.69315 2.61951 2.69315H6.53076V4.38587H14.3533V2.69315H15.4987Z"
                    stroke="#A9DFD8"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.1187 9.4636L7.64867 13.9781H13.2384L8.76617 18.492M6.53117 1H14.3537V4.38544H6.53117V1Z"
                    stroke="#A9DFD8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-details">
                <h3>500</h3>
                <p>Total Order</p>
                <span className="trend-up">+8% from yesterday</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="21"
                  height="25"
                  viewBox="0 0 21 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4987 2.69315H18.2645C18.5609 2.69315 18.8451 2.81204 19.0547 3.02367C19.2643 3.2353 19.382 3.52233 19.382 3.82163V22.4415C19.382 22.7408 19.2643 23.0279 19.0547 23.2395C18.8451 23.4511 18.5609 23.57 18.2645 23.57H2.61951C2.32313 23.57 2.03889 23.4511 1.82932 23.2395C1.61975 23.0279 1.50201 22.7408 1.50201 22.4415V3.82163C1.50201 3.52233 1.61975 3.2353 1.82932 3.02367C2.03889 2.81204 2.32313 2.69315 2.61951 2.69315H6.53076V4.38587H14.3533V2.69315H15.4987Z"
                    stroke="#A9DFD8"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.1187 9.4636L7.64867 13.9781H13.2384L8.76617 18.492M6.53117 1H14.3537V4.38544H6.53117V1Z"
                    stroke="#A9DFD8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-details">
                <h3>9</h3>
                <p>Product Sold</p>
                <span className="trend-up">+2% from yesterday</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3482 12C13.3821 12 15.8416 9.57487 15.8416 6.58332C15.8416 3.59178 13.3821 1.16666 10.3482 1.16666C7.31422 1.16666 4.85472 3.59178 4.85472 6.58332C4.85472 9.57487 7.31422 12 10.3482 12Z"
                    stroke="#20AEF3"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.7432 16.3333H21.3353M15.8419 22.8333H2.94987C2.63826 22.8334 2.33021 22.7681 2.04614 22.6418C1.76208 22.5155 1.5085 22.3311 1.30225 22.1008C1.096 21.8704 0.941783 21.5995 0.849842 21.3059C0.7579 21.0124 0.730334 20.7029 0.768973 20.398L1.19746 17.0136C1.29711 16.2274 1.68464 15.5041 2.28718 14.9798C2.88972 14.4555 3.66575 14.1663 4.46936 14.1666H4.855L15.8419 22.8333ZM18.0393 13.0833V19.5833V13.0833Z"
                    stroke="#20AEF3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-details">
                <h3>12</h3>
                <p>New Customer</p>
                <span className="trend-up">+3% from yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Section */}
        <div className="level-card">
          <h2>Level</h2>
          <div className="level-chart">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/bars.png"
              alt="level bars"
            />
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot volume"></div>
              <span>Volume</span>
            </div>
            <div className="legend-divider"></div>
            <div className="legend-item">
              <div className="legend-dot service"></div>
              <span>Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products & Customer Section */}
      <div className="products-customer-section">
        {/* Top Products */}
        <div className="products-card">
          <h2 className="card-title">Top Products</h2>
          <div className="products-table">
            <div className="table-header">
              <span>#</span>
              <span>Name</span>
              <span>Popularity</span>
              <span>Sales</span>
            </div>

            <div className="table-row">
              <span>01</span>
              <span>Home Decore Range</span>
              <div className="popularity-bar">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/group-12.png"
                  alt="popularity"
                />
              </div>
              <div className="sales-tag">46%</div>
            </div>

            <div className="table-row">
              <span>02</span>
              <span>Disney Princess Dress</span>
              <div className="popularity-bar">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/group-12-2.png"
                  alt="popularity"
                />
              </div>
              <div className="sales-tag">17%</div>
            </div>

            <div className="table-row">
              <span>03</span>
              <span>Bathroom Essentials</span>
              <div className="popularity-bar">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/group-12-3.png"
                  alt="popularity"
                />
              </div>
              <div className="sales-tag">19%</div>
            </div>

            <div className="table-row">
              <span>04</span>
              <span>Apple Smartwatch</span>
              <div className="popularity-bar">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/group-12-4.png"
                  alt="popularity"
                />
              </div>
              <div className="sales-tag">29%</div>
            </div>
          </div>
        </div>

        {/* Customer Fulfillment */}
        <div className="fulfillment-card">
          <h2 className="card-title">Customer Fulfillment</h2>
          <div className="fulfillment-chart">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/graph.png"
              alt="fulfillment graph"
            />
          </div>
          <div className="details-container">
            <div className="horizontal-line-top"></div>

            <div className="content-wrapper">
              <div className="frame-72">
                <div className="label-wrapper">
                  <div className="dot last-month"></div>
                  <span className="label">Last Month</span>
                </div>
                <span className="amount">{lastMonthAmount}</span>
              </div>

              <div className="vertical-line"></div>

              <div className="frame-74">
                <div className="label-wrapper">
                  <div className="dot this-month"></div>
                  <span className="label">This Month</span>
                </div>
                <span className="amount">{thisMonthAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings & Visitor Section */}
      <div className="earnings-visitor-section">
        {/* Earnings */}
        <div className="earnings-card">
          <h2 className="card-title">Earnings</h2>
          <div className="earnings-details">
            <h3>$6078.76</h3>
            <p>Profit is 48% More than last Month</p>
          </div>
          <div className="earnings-meter">
            <div className="meter-circle">
              <span className="meter-value">80%</span>
            </div>
          </div>
        </div>

        {/* Visitor Insights */}
        <div className="visitor-insights">
          <h2 className="card-title">Visitor Insights</h2>
          <div className="graph-container">
            <div className="y-axis">
              {yAxisLabels.map((label, index) => (
                <span key={index} className="y-label">
                  {label}
                </span>
              ))}
            </div>
            <div className="graph-content">
              <div className="graph-image">
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z8sif7wkNXOiaWHY/graph.png"
                  alt="Visitor insights graph"
                />
              </div>
              <div className="x-axis">
                {xAxisLabels.map((label, index) => (
                  <span key={index} className="x-label">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview_EarningsAndVisitorInsights_LevelAndCustomerFulfillment;
