# Magical Dessert Recipe Ebook

> Discover enchanting recipes filled with magic and wonder

แอปพลิเคชันเว็บสำหรับสูตรขนมหวานมหัศจรรย์แบบโต้ตอบ ที่มีธีมแฟนตาซีสุดมหัศจรรย์ ผู้ใช้สามารถเรียกดู ค้นหา กรอง และจัดการสูตรขนมหวานที่มีมนต์ขลัง พร้อมฟีเจอร์ต่างๆ เช่น การให้คะแนนจากชุมชน รายการโปรด วิเคราะห์โภชนาการ แชร์สูตร และระบบจัดการเนื้อหาสำหรับผู้ดูแล

## Features

### Recipe Management
- **6 สูตรมหัศจรรย์สำเร็จรูป**: Dragon Cake, Dragon Cookies, Fire Desserts, Bewitched Brownies, Crystal Candy, Starry Night Pudding
- แต่ละสูตรมีส่วนผสมปกติและส่วนผสมมหัศจรรย์พร้อมคาถาร่ายมนต์

### Search & Filtering
- ค้นหาข้อความเต็มรูปแบบในชื่อสูตร คำอธิบาย และแนวคิด
- ตัวกรองหมวดหมู่: Cakes, Cookies, Puddings, Brownies, Desserts, Candy
- ตัวกรองระดับความยาก: Easy ถึง Expert
- โหมดดู: สูตรทั้งหมด รายการโปรด
- ตัวเลือกการเรียงลำดับหลายแบบ: Default, Popularity, Category, Difficulty, Name (A-Z)

### User Features
- **ระบบรายการโปรด**: บันทึก/บุ๊คมาร์คสูตรด้วย localStorage
- **ระบบให้คะแนน 5 ดาว**: คะแนนรวมและคะแนนส่วนตัว พร้อมรองรับโหมด Incognito
- **วิเคราะห์โภชนาการ**: คำนวณค่าโภชนาการอัตโนมัติจากส่วนผสม

### Recipe Sharing
- แชร์ผ่าน URL
- แชร์ผ่านข้อความ
- ส่งออกเป็น JSON

### Admin Panel
- ล็อกอินสำหรับผู้ดูแลระบบ
- เพิ่ม/แก้ไข/ลบสูตร
- จัดการเนื้อหาทั้งหมด

### Multi-Device Support
- รองรับ Responsive Design สำหรับทุกขนาดอุปกรณ์
- Mobile, Tablet และ Desktop
- รองรับการใช้งานแบบ Touch

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Pythonanywhere
- **Design**: Glass-morphism UI, Animated gradients, Responsive layout

## Project Structure

```
root/
├── index.html          # หน้าหลักสำหรับเรียกดูสูตร
├── login.html          # หน้าล็อกอินสำหรับผู้ดูแล
├── admin.html          # หน้าจัดการเนื้อหา
├── script.js           # Logic หลักของแอปพลิเคชัน
├── auth.js             # ระบบ Authentication
├── admin.js            # ฟังก์ชันสำหรับผู้ดูแล
├── styles.css          # Styling ทั้งหมด
└── img/                # รูปภาพสูตร
    ├── Dragon Cake.png
    ├── Dragon Cookies.png
    ├── Fire Desserts.png
    ├── Bewitched Brownies.png
    ├── Crystal Candy.png
    └── Starry Night Pudding.png
```

## Installation & Setup

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- ไม่มี Dependencies

### Steps

1. Clone repository:
   ```bash
   git clone <repository-url>
   ```

2. เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์

3. เริ่มใช้งานได้ทันที!

### Admin Access

เข้าถึง Admin Panel ที่ `admin.html` ด้วยข้อมูลเริ่มต้น:
- **Username**: `admin`
- **Password**: `magic123`

## Usage

### สำหรับผู้ใช้ทั่วไป

1. **เรียกดูสูตร**: เปิด `index.html` เพื่อดูสูตรทั้งหมด
2. **ค้นหา**: ใช้ช่องค้นหาเพื่อหาสูตรที่ต้องการ
3. **กรอง**: เลือกหมวดหมู่หรือระดับความยากที่ต้องการ
4. **บันทึกรายการโปรด**: คลิกไอคอนหัวใจเพื่อบันทึกสูตรที่ชอบ
5. **ให้คะแนน**: ให้คะแนน 1-5 ดาวสำหรับสูตรที่ลอง
6. **แชร์**: แชร์สูตรผ่าน URL, ข้อความ หรือ JSON

### สำหรับผู้ดูแลระบบ

1. ไปที่ `login.html` และล็อกอิน
2. เข้าถึง `admin.html` เพื่อจัดการสูตร
3. เพิ่ม แก้ไข หรือลบสูตรตามต้องการ

## Data Storage

ข้อมูลทั้งหมดถูกเก็บใน localStorage ของเบราว์เซอร์:
- `magicalRecipeAuth` - สถานะการล็อกอิน
- `magicalRecipeCurrentUser` - ข้อมูลผู้ใช้ปัจจุบัน
- `magicalRecipeUsers` - บัญชีผู้ใช้ทั้งหมด
- `magicalRecipes` - คอลเลกชันสูตร
- `magicalRecipeFavorites` - รายการโปรด
- `magicalRecipeGlobalRatings` - คะแนนรวมจากชุมชน
- `magicalRecipeSessionRatings` - คะแนนของ Session

> **หมายเหตุ**: ข้อมูลจะสูญหายหากล้าง localStorage ของเบราว์เซอร์

## Browser Support

- Google Chrome (แนะนำ)
- Mozilla Firefox
- Safari
- Microsoft Edge

## Contributing

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## Configuration

### การตั้งค่าเริ่มต้น
- ระบบใช้ค่าเริ่มต้นที่พร้อมใช้งานทันที
- สามารถปรับแต่งธีมสีได้ผ่าน CSS variables ใน `styles.css`
- การตั้งค่าผู้ดูแลระบบสามารถแก้ไขได้ใน `auth.js`

### การปรับแต่งขั้นสูง
- แก้ไขสูตรเริ่มต้นใน `script.js`
- ปรับขนาดรูปภาพและ breakpoints ใน `styles.css`
- เพิ่มหมวดหมู่ใหม่ได้ผ่าน Admin Panel

## Manual and Documentation

### คู่มือการใช้งาน

#### สำหรับผู้ใช้ทั่วไป
1. เปิดเว็บไซต์ผ่าน `index.html`
2. เลือกดูสูตรที่สนใจจากรายการ
3. ใช้ตัวกรองเพื่อค้นหาสูตรตามความต้องการ
4. กดไอคอนหัวใจเพื่อบันทึกเป็นรายการโปรด
5. ให้คะแนนและแชร์สูตรที่ชอบ

#### สำหรับผู้ดูแลระบบ
1. ล็อกอินผ่าน `login.html`
2. เข้าสู่ Admin Panel ที่ `admin.html`
3. จัดการสูตร: เพิ่ม แก้ไข หรือลบ
4. ดูสถิติการใช้งาน

### เอกสารเพิ่มเติม
- โครงสร้างไฟล์อธิบายไว้ในส่วน Project Structure
- รายละเอียด API และ Functions อยู่ใน comments ของโค้ด
- ติดต่อทีมพัฒนาหากต้องการความช่วยเหลือเพิ่มเติม

## License

This project is for educational purposes.

---

Made with magic and wonder
