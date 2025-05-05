CREATE DATABASE HocTiengAnhOnline1
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE HocTiengAnhOnline1;

CREATE TABLE users (
  id INT NOT NULL  PRIMARY KEY,
  ho_ten VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mat_khau VARCHAR(255) NOT NULL,
  sdt VARCHAR(12) NOT NULL,
  vai_tro ENUM('hoc_vien', 'giao_vien', 'admin') NOT NULL,
  trang_thai ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `hoc_vien` (
  `id` INT NOT NULL  PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `ngay_sinh` DATE NOT NULL,
  `gioi_tinh` ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
  `dia_chi` VARCHAR(255) NOT NULL,
  `ngay_dang_ky` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `giao_vien` (
  `id` INT NOT NULL  PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `chuyen_mon` VARCHAR(255) NOT NULL,
  `kinh_nghiem` TEXT NOT NULL,
  `hoc_vi` VARCHAR(100) NOT NULL,
  `mo_ta_ngan` TEXT,
  `trang_thai` ENUM('dang_day', 'tam_nghi') NOT NULL DEFAULT 'dang_day',
  `ngay_tham_gia` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `khoa_hoc` (
  `id` INT NOT NULL PRIMARY KEY,
  `ten_khoa_hoc` VARCHAR(255) NOT NULL,
  `mo_ta` TEXT,
  `gia` DECIMAL(10,2) NOT NULL,
  `trang_thai` ENUM('dang_mo', 'dong') NOT NULL DEFAULT 'dang_mo',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bai_hoc` (
  `id` INT NOT NULL PRIMARY KEY,
  `ten_bai_hoc` VARCHAR(255) NOT NULL,
  `noi_dung` TEXT NOT NULL,
  `khoa_hoc_id` INT NOT NULL,
  `thu_tu` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`khoa_hoc_id`) REFERENCES `khoa_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `dang_ky_khoa_hoc` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT  NOT NULL,
  `khoa_hoc_id` INT NOT NULL,
  `ngay_dang_ky` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `trang_thai` ENUM('thanh_cong', 'that_bai') NOT NULL DEFAULT 'thanh_cong',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`khoa_hoc_id`) REFERENCES `khoa_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `don_hang` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT  NOT NULL,
  `tong_tien` DECIMAL(10,2) NOT NULL,
  `trang_thai` ENUM('thanh_cong') NOT NULL DEFAULT 'thanh_cong',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `danh_gia` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT NOT NULL,
  `khoa_hoc_id` INT NOT NULL,
  `diem_so` INT NOT NULL CHECK (`diem_so` BETWEEN 1 AND 5),
  `binh_luan` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`khoa_hoc_id`) REFERENCES `khoa_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `binh_luan_bai_hoc` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT NOT NULL,
  `bai_hoc_id` INT NOT NULL,
  `noi_dung` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`bai_hoc_id`) REFERENCES `bai_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `chung_nhan` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT NOT NULL,
  `khoa_hoc_id` INT NOT NULL,
  `ngay_cap` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`khoa_hoc_id`) REFERENCES `khoa_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `quiz` (
  `id` INT NOT NULL PRIMARY KEY,
  `bai_hoc_id` INT NOT NULL,
  `cau_hoi` TEXT NOT NULL,
  `dap_an_a` TEXT NOT NULL,
  `dap_an_b` TEXT NOT NULL,
  `dap_an_c` TEXT NOT NULL,
  `dap_an_d` TEXT NOT NULL,
  `dap_an_dung` ENUM('A', 'B', 'C', 'D') NOT NULL,
  FOREIGN KEY (`bai_hoc_id`) REFERENCES `bai_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `lich_su_hoc` (
  `id` INT NOT NULL PRIMARY KEY,
  `user_id` INT NOT NULL,
  `bai_hoc_id` INT NOT NULL,
  `trang_thai` ENUM('chua_hoc', 'dang_hoc', 'hoan_thanh') NOT NULL DEFAULT 'chua_hoc',
  `ngay_cap_nhat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`bai_hoc_id`) REFERENCES `bai_hoc`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Thêm dữ liệu vào bảng users
INSERT INTO users (id, ho_ten, email, mat_khau, sdt, vai_tro, trang_thai) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', 'hashed_password_1', '0123456789', 'hoc_vien', 'active'),
(2, 'Trần Thị B', 'tranthib@example.com', 'hashed_password_2', '0987654321', 'giao_vien', 'active'),
(3, 'Admin C', 'admin@example.com', 'hashed_password_3', '0345678912', 'admin', 'active');

-- Thêm dữ liệu vào bảng hoc_vien
INSERT INTO hoc_vien (id, user_id, ngay_sinh, gioi_tinh, dia_chi) VALUES
(1, 1, '2000-05-20', 'Nam', 'Hà Nội');

-- Thêm dữ liệu vào bảng giao_vien
INSERT INTO giao_vien (id, user_id, chuyen_mon, kinh_nghiem, hoc_vi, mo_ta_ngan, trang_thai) VALUES
(1, 2, 'Tiếng Anh giao tiếp', '5 năm giảng dạy tại trung tâm XYZ', 'Thạc sĩ Ngôn ngữ Anh', 'Giáo viên giàu kinh nghiệm', 'dang_day');

-- Thêm dữ liệu vào bảng khoa_hoc
INSERT INTO khoa_hoc (id, ten_khoa_hoc, mo_ta, gia, trang_thai) VALUES
(1, 'Tiếng Anh Cơ Bản', 'Khóa học dành cho người mới bắt đầu', 500000, 'dang_mo'),
(2, 'Tiếng Anh Giao Tiếp', 'Giúp bạn tự tin giao tiếp tiếng Anh', 700000, 'dang_mo');

-- Thêm dữ liệu vào bảng bai_hoc
INSERT INTO bai_hoc (id, ten_bai_hoc, noi_dung, khoa_hoc_id, thu_tu) VALUES
(1, 'Giới thiệu bản thân', 'Hướng dẫn cách giới thiệu bản thân bằng tiếng Anh', 1, 1),
(2, 'Chào hỏi', 'Các mẫu câu chào hỏi cơ bản', 1, 2),
(3, 'Mua sắm', 'Giao tiếp trong khi mua sắm', 2, 1);

-- Thêm dữ liệu vào bảng dang_ky_khoa_hoc
INSERT INTO dang_ky_khoa_hoc (id, user_id, khoa_hoc_id, trang_thai) VALUES
(1, 1, 1, 'thanh_cong'),
(2, 1, 2, 'thanh_cong');

-- Thêm dữ liệu vào bảng don_hang
INSERT INTO don_hang (id, user_id, tong_tien, trang_thai) VALUES
(1, 1, 500000, 'thanh_cong'),
(2, 1, 700000, 'thanh_cong');

-- Thêm dữ liệu vào bảng danh_gia
INSERT INTO danh_gia (id, user_id, khoa_hoc_id, diem_so, binh_luan) VALUES
(1, 1, 1, 5, 'Khóa học rất bổ ích!'),
(2, 1, 2, 4, 'Nội dung hay nhưng cần thêm ví dụ thực tế.');

-- Thêm dữ liệu vào bảng binh_luan_bai_hoc
INSERT INTO binh_luan_bai_hoc (id, user_id, bai_hoc_id, noi_dung) VALUES
(1, 1, 1, 'Bài học dễ hiểu, cảm ơn thầy cô!'),
(2, 1, 2, 'Mong có thêm nhiều bài tập thực hành.');

-- Thêm dữ liệu vào bảng chung_nhan
INSERT INTO chung_nhan (id, user_id, khoa_hoc_id) VALUES
(1, 1, 1),
(2, 1, 2);

-- Thêm dữ liệu vào bảng quiz
INSERT INTO quiz (id, bai_hoc_id, cau_hoi, dap_an_a, dap_an_b, dap_an_c, dap_an_d, dap_an_dung) VALUES
(1, 1, 'Câu nào đúng về giới thiệu bản thân?', 'I am a student', 'He is a doctor', 'They are teachers', 'She is a nurse', 'A');

-- Thêm dữ liệu vào bảng lich_su_hoc
INSERT INTO lich_su_hoc (id, user_id, bai_hoc_id, trang_thai) VALUES
(1, 1, 1, 'hoan_thanh'),
(2, 1, 2, 'dang_hoc');

ALTER TABLE users CHANGE COLUMN mat_khau password VARCHAR(255);

select * from users;
-- LOGIN AUTHENTICATION
DROP PROCEDURE IF EXISTS checkLogin;
DELIMITER //
CREATE PROCEDURE checkLogin(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT email, password, email, ho_ten, sdt, vai_tro
    FROM users
    WHERE (email = p_email)
      AND password = p_password;
END //
DELIMITER ;

SELECT * FROM hoc_vien;
SHOW TABLES;

SELECT * FROM users;
