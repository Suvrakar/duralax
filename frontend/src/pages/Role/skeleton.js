import React from "react";
import Skeleton from "react-loading-skeleton";

function skeleton() {
  return (
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* <!-- Basic Bootstrap Table --> */}
        <div className="card">
          <h5 className="card-header d-flex justify-content-between">
            <Skeleton count={1} width={100} height={30} />
            <button className="btn" tabindex="0" type="button">
              <span>
                <Skeleton count={1} width={100} height={30} />
              </span>
            </button>
          </h5>

          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <Skeleton count={1} width={100} height={10} />
                  </th>
                  <th>
                    <Skeleton count={1} width={100} height={10} />
                  </th>
                  <th>
                    <Skeleton count={1} width={100} height={10} />
                  </th>
                  <th>
                    <Skeleton count={1} width={100} height={10} />
                  </th>
                  <th>
                    <Skeleton count={1} width={100} height={10} />
                  </th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.from({ length: 5 }).map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <Skeleton count={1} width={100} height={20} />
                    </td>
                    <td>
                      <Skeleton count={1} width={100} height={20} />
                    </td>
                    <td>
                      <Skeleton count={1} width={100} height={20} />
                    </td>
                    <td>
                      <Skeleton count={1} width={100} height={20} />
                    </td>
                    <td>
                      <Skeleton count={1} width={100} height={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--/ Basic Bootstrap Table --> */}
      </div>
      {/* / Content */}
      <div className="content-backdrop fade" />
    </div>
  );
}

export default skeleton;
