Dưới đây là **bản README đã chỉnh sửa, rõ ràng và chuyên nghiệp hơn** cho dự án **ai-schedule-assistant** — bạn có thể **copy & dán vào file `README.md`** trong repo của bạn.

---

# 📅 AI Schedule Assistant

Trợ lý lập lịch thông minh chạy trên nền **React Native (Expo)**, sử dụng AI để tạo & quản lý lịch trình một cách tự động.

> 📌 *Ai-Schedule-Assistant giúp bạn nhập lịch bằng ngôn ngữ tự nhiên, gợi ý thời gian phù hợp, và đồng bộ hóa lịch cá nhân – giúp bạn tổ chức thời gian hiệu quả hơn.*

---

## 🚀 Tính năng chính

* 🧠 **Tạo lịch từ ngôn ngữ tự nhiên**
  Nhập câu như “Hẹn họp với team vào 3 chiều thứ Hai” → app tự chuyển thành sự kiện.

* 📆 **Xem và sửa lịch dễ dàng**
  Giao diện danh sách & lịch trực quan.

* 🔔 **Thông báo nhắc sự kiện**
  Nhắc trước sự kiện quan trọng.

* 🤖 **Tích hợp AI**
  AI giúp hiểu yêu cầu tự nhiên, gợi ý thời gian tốt nhất cho bạn.

---

## 🛠️ Công nghệ

* **React Native + Expo**
* **TypeScript**
* **AI Backend** (ví dụ: OpenAI API / GPT-based service)
* Quản lý trạng thái với **React Query / Redux** (tuỳ cài đặt)
* Tích hợp lịch & thông báo thiết bị

---

## 📥 Cài đặt & chạy

### 1️⃣ Clone repository

```bash
git clone https://github.com/nga4704/ai-schedule-assistant.git
cd ai-schedule-assistant
```

### 2️⃣ Cài dependencies

```bash
npm install
```

hoặc với Yarn:

```bash
yarn install
```

### 3️⃣ Thiết lập biến môi trường

Tạo file `.env` ở root với các biến cần thiết (ví dụ):

```env
OPENAI_API_KEY=your_openai_api_key
```

### 4️⃣ Chạy app

```bash
npx expo start
```

Mở trên **thiết bị thật** hoặc **simulator/emulator**.

---


## 📁 Cấu trúc thư mục

```
├── app/                  # Màn hình & navigation
├── assets/               # Hình ảnh, font
├── components/           # Component tái sử dụng
├── services/             # API clients & logic
├── utils/                # Hàm tiện ích
├── hooks/                # Custom hooks
├── constants/            # Hằng số dùng chung
├── firebase/             # (Nếu có) config Firebase
└── ...
```

---

## 💡 Sử dụng AI

Ứng dụng sử dụng AI để:

* Phân tích câu nhập người dùng → chuyển thành sự kiện
* Gợi ý khung thời gian phù hợp
* Giải thích hoặc chỉnh sửa lịch dễ hiểu hơn

---

## 🧑‍💻 Tác giả

📌 **nga4704** – Nhà phát triển chính

---
