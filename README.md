🗓️ AI Schedule Assistant

Ứng dụng di động giúp tạo và quản lý lịch biểu cá nhân/nhóm thông minh bằng AI, hỗ trợ đề xuất thời khóa biểu, nhắc lịch, và tối ưu thời gian theo thói quen người dùng.

🚀 Tính năng chính

🧠 Tạo lịch tự động với AI
Nhập mục tiêu, sở thích và hạn chót → hệ thống đề xuất lịch trình tối ưu.

📅 Xem, chỉnh sửa và xóa các sự kiện
Giao diện lịch hàng ngày, tuần, tháng.

🔔 Nhắc nhở thông minh
Nhắc các công việc quan trọng dựa trên hành vi và thời gian ưu tiên của bạn.

☁️ Đồng bộ dữ liệu
Lưu trên Firebase để truy cập trên nhiều thiết bị.

📱 Demo & Ảnh màn hình

![Uploading image.png…]()



🧩 Công nghệ & Kiến trúc
Thành phần	Công nghệ
Frontend	React Native + Expo
Backend	Firebase (Authentication, Firestore)
AI Assistant	OpenAI (ChatGPT/Function Calling)
Lint & Style	ESLint
Ngôn ngữ	TypeScript
🛠️ Cài đặt & Chạy
1. Clone repository
git clone https://github.com/nga4704/ai-schedule-assistant.git
cd ai-schedule-assistant

2. Cài dependencies
npm install

3. Cấu hình biến môi trường

Tạo file .env theo mẫu:

FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
OPENAI_API_KEY=...

4. Chạy ứng dụng
npx expo start

🧠 Hướng dẫn sử dụng cơ bản

Đăng nhập/Đăng ký

Email hoặc tài khoản Google.

Nhập thông tin lịch cần lên kế hoạch

Mục tiêu, deadline, mức ưu tiên.

Xem lịch được AI đề xuất

Chạm vào ngày để xem chi tiết.

Chỉnh sửa/Hoàn tất công việc

Giao diện đơn giản, kéo thả để thay đổi thời gian.
