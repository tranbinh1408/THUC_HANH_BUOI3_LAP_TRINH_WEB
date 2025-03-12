import { useAppointmentData } from '@/hooks/useAppointmentData';
import { Card } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import AppointmentCountCard from './components/ApppointmentCountCard';
import FilterControls from './components/FilterControls';
import RevenueTable from './components/RevenueTable';

const BaoCaoPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'ngay' | 'thang'>('ngay');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(moment());

  const {
    filteredAppointments,
    revenueByService,
    revenueByEmployee
  } = useAppointmentData(filterType, selectedDate);

  const handleFilterChange = (e: any) => {
    setFilterType(e.target.value);
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
  };

  return (
    <Card
      title="Báo cáo thống kê"
      extra={
        <FilterControls
          filterType={filterType}
          selectedDate={selectedDate}
          onFilterChange={handleFilterChange}
          onDateChange={handleDateChange}
        />
      }
    >
      <AppointmentCountCard count={filteredAppointments.length} />

      <RevenueTable title="Dịch vụ" data={revenueByService} />

      <RevenueTable title="Nhân viên" data={revenueByEmployee} />
    </Card>
  );
};

export default BaoCaoPage;