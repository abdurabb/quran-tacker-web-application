import React, { useState, useEffect } from 'react'
import { useGetDailyReports, useGetAllClasses, useGetTopStudents } from '../../../apis/useAdminDataController';
import Report from '../../../components/report/Report';

function DailyReports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [classId, setClassId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [classSearch, setClassSearch] = useState('');
  const [sort, setSort] = useState(-1);
  const { data, isLoading } = useGetDailyReports(startDate, endDate, classId, page, limit, search, sort);
  const { data: topStudentsData, isLoading: topStudentsLoading } = useGetTopStudents(startDate, endDate, 3);
  const { data: classesData } = useGetAllClasses(classSearch);

  const reports = data?.marks || [];
  const topThree = topStudentsData?.topStudents || [];
  const classes = classesData?.classes || [];
  const totalPages = data?.totalPages || 0;


  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [startDate, endDate, classId, search, sort]);
  return (
    <Report
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      classId={classId}
      setClassId={setClassId}
      page={page}
      setPage={setPage}
      topStudentsLoading={topStudentsLoading}
      search={search}
      setSearch={setSearch}
      classes={classes}
      reports={reports}
      topThree={topThree}
      totalPages={totalPages}
      isLoading={isLoading}
      setSort={setSort}
      sort={sort}
      type={"admin"}
    />
  )
}

export default DailyReports