import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useGetAttendance } from '../../../apis/useUserDataController';
import PageNation from '../../../components/pagination/Pagination';

function Attendance() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);

  // default last 30 days
  useEffect(() => {
    const today = new Date();
    const last30 = new Date();
    last30.setDate(today.getDate() - 30);

    setStartDate(last30.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  // api call
  const {
    data,
    isLoading,
    error
  } = useGetAttendance({ startDate, endDate, page });

  const attendanceList = data?.attendanceData || [];

  return (
    <div>
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Calendar className="text-green-600" size={32} />
        Attendance Record
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setPage(1);
              setStartDate(e.target.value);
            }}
            className="block mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setPage(1);
              setEndDate(e.target.value);
            }}
            className="block mt-1 px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-10 font-medium">
          Loading attendance...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-red-600">
          Failed to load attendance
        </div>
      )}

      {/* Data */}
      {!isLoading && !error && (
        <>
          {/* Attendance List */}
          <div className="space-y-3">
            {attendanceList.length === 0 && (
              <p className="text-center text-gray-500">
                No attendance records found
              </p>
            )}

            {attendanceList.map((item) => {
              const isPresent = item.status === 'present';

              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleTimeString()}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 font-semibold ${isPresent ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {isPresent ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}
                    {isPresent ? 'Present' : 'Absent'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {data?.totalPages > 1 && (
            <div className="p-4">
              <PageNation totalPage={data.totalPages} setPage={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Attendance;
