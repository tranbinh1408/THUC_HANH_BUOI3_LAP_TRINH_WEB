declare module NhanVien {
	export interface ILichLamViec {
		thu: number; // 0: Chủ nhật, 1-6: Thứ 2 đến thứ 7
		gioLam: string; // format: HH:mm
		gioNghi: string; // format: HH:mm
	}

	export interface IRecord {
		_id: string;
		maNhanVien: string;
		hoTen: string;
		soDienThoai: string;
		email?: string;
		gioiTinh: 'Nam' | 'Nữ';
		anhDaiDien?: string;
		ngaySinh?: string;
		diaChi?: string;
		chuyenMon?: string[];
		soKhachToiDa: number;
		lichLamViec: ILichLamViec[];
		trangThai: boolean;
		createdAt?: string;
		updatedAt?: string;
		//Giang
    feedbacks: string[];
		averageRate?: number;

	}
}
