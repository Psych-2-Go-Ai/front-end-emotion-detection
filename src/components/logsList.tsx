import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import supabase from "~/utils/supabase";

interface Logs {
  userid: string;
  name: string;
  age: number;
  gender: string;
  emotion: string;
  depression: number;
  timestamp: string;
}

export default function LogsList() {
  const pageViewData = 9;
  const [logs, setLogs] = useState<Logs[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [userId, setUserId] = useState<string>();

  const handlePageClick = (selected: { selected: number }) => {
    const newOffset = selected.selected * pageViewData;
    setItemOffset(newOffset);
  };

  const pageCount = Math.ceil(logs.length / pageViewData);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.id !== null) {
        setUserId(session.user.id);
      } else {
        setUserId("logged-out");
      }
    });

    // Fetch data only if the user is authenticated
    if (userId !== "logged-out") {
      const baseUrl =
        process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost.com:3000";
      axios
        .get<Logs[]>(
          `${baseUrl}/api/getAllUsers?userid=${
            userId ? userId.toString() : "logged-out"
          }`
        )
        .then((res: AxiosResponse<Logs[]>) => {
          return setLogs(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <>
      <div>
        {userId !== "logged-out" ? (
          <table className="data-table table-auto w-full responsive-table">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Age</th>
                <th className="text-left">Gender</th>
                <th className="text-left">Emotion</th>
                <th className="text-left">Depression Index (0-1)</th>
                <th className="text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length ? (
                logs
                  .slice(itemOffset, itemOffset + pageViewData)
                  .map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="capitalize">{item.name}</td>
                        <td className="capitalize">{item.age}</td>
                        <td>{item.gender}</td>
                        <td className="capitalize">{item.emotion}</td>
                        <td>{item.depression}</td>
                        <td className="uppercase">
                          {new Date(item.timestamp).toLocaleString("en-US", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    <strong>No data found</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center">Please log in to see logs.</div>
        )}
      </div>
      {logs.length > pageViewData && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageViewData}
          pageCount={pageCount}
          previousLabel=" previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      )}
    </>
  );
}
