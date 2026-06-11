import { useState, useMemo } from "react";

// ========== DATA FROM EXCEL ==========
const COMPUTERS_RAW = [
  // Sheet: 11-12 มิ.ย
  { id: 1, oldName: "CHC-DOCTOR105", dept: "ห้องตรวจ 5", building: "หลวงพ่อแช่ม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 2, oldName: "CHC-DOCTOR103", dept: "ห้องตรวจ 3", building: "หลวงพ่อแช่ม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 3, oldName: "DRIVETHRU2", dept: "ห้องจ่ายยา", building: "หลวงพ่อแช่ม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 4, oldName: "CHC-PHR101", dept: "ห้องจ่ายยา", building: "หลวงพ่อแช่ม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 5, oldName: "LC-MONK201", dept: "หลวงพ่อแช่ม 2", building: "หลวงพ่อแช่ม 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 6, oldName: "LC-MONK205", dept: "หลวงพ่อแช่ม 2", building: "หลวงพ่อแช่ม 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 7, oldName: "LC-MONK402", dept: "หลวงพ่อแช่ม 4", building: "หลวงพ่อแช่ม 4", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 8, oldName: "SURG-ORTH107", dept: "ศัลกรรมกระดูก", building: "หลวงพ่อแช่ม 5", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 9, oldName: "SURG-ORTH103", dept: "ศัลกรรมกระดูก", building: "หลวงพ่อแช่ม 5", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 10, oldName: "RCU103", dept: "RCU", building: "สงฆ์อาพาธ 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 11, oldName: "RCU-03", dept: "RCU", building: "สงฆ์อาพาธ 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 12, oldName: "MONK-02", dept: "สงฆ์พิเศษ", building: "สงฆ์อาพาธ 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 13, oldName: "CHEMO02", dept: "เคมีบำบัด", building: "ข้างตึกสงฆ์", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 14, oldName: "ICU-SURG-01", dept: "ICU ศัลยกรรม", building: "น้อมเกล้า 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 15, oldName: "ICU-SURG-03", dept: "ICU ศัลยกรรม", building: "น้อมเกล้า 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 16, oldName: "KIDNEY-ROOM3", dept: "ไตเทียม", building: "น้อมเกล้า 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 17, oldName: "kidney-04", dept: "ไตเทียม", building: "น้อมเกล้า 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 18, oldName: "kidney-105", dept: "ไตเทียม", building: "น้อมเกล้า 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 19, oldName: "eeg402", dept: "คลื่นไฟฟ้าสมอง", building: "น้อมเกล้า 4", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 20, oldName: "PHARM-IPD105", dept: "ห้องยาปุดจ้อ", building: "ปุดจ้อ 1", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 21, oldName: "PHARM-IPD109", dept: "ห้องยาปุดจ้อ", building: "ปุดจ้อ 1", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 22, oldName: "PHARMIPD02", dept: "ห้องยาปุดจ้อ", building: "ปุดจ้อ 1", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 23, oldName: "it-pjpharm", dept: "ห้องยาปุดจ้อ", building: "ปุดจ้อ 1", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 24, oldName: "PJ-ACCOUNT999", dept: "ห้องยาปุดจ้อ", building: "ปุดจ้อ 1", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 25, oldName: "ANDAMAN105", dept: "ศัลยกรรมประสาท", building: "อันดามัน 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 26, oldName: "SHE204-PC", dept: "อาชีวะเวชกรรม", building: "ทางเชื่อม", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 27, oldName: "SHE203", dept: "อาชีวะเวชกรรม", building: "ทางเชื่อม", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 28, oldName: "REHAB201", dept: "แพทย์แผนจีน", building: "ศรีพัชรินทร์", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 29, oldName: "SRI-REHAB103", dept: "แพทย์แผนจีน", building: "ศรีพัชรินทร์", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 30, oldName: "SRI-REHAB104", dept: "แพทย์แผนจีน", building: "ศรีพัชรินทร์", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 31, oldName: "DR-CHINESE101", dept: "แพทย์แผนจีน", building: "ศรีพัชรินทร์", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 32, oldName: "LR-04", dept: "ห้องคลอด", building: "สูติกรรม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 33, oldName: "LR-05", dept: "ห้องคลอด", building: "สูติกรรม 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 34, oldName: "STROKE-02", dept: "Stroke Unit", building: "ศูนย์คอมพิวเตอร์ 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 35, oldName: "ReHab-102V", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 36, oldName: "REHAB107", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 37, oldName: "TM-REHAB109", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 38, oldName: "rehab105", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 39, oldName: "REHAB108", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 40, oldName: "REHAB108-PC", dept: "กายภาพบำบัด", building: "ทรอม่า 2", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 41, oldName: "XRAY-108", dept: "รังสีวิทยา", building: "ทรอม่า 3", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 42, oldName: "ANES502", dept: "วิสัญญี", building: "ทรอม่า 7", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 43, oldName: "TM-ANES705", dept: "วิสัญญี", building: "ทรอม่า 7", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 44, oldName: "OR-509", dept: "ห้องผ่าตัด", building: "ทรอม่า 7", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 45, oldName: "HYPCHM108", dept: "เวชศาสตร์ใต้น้ำ", building: "ชั้น 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 46, oldName: "HYPCHM_101", dept: "เวชศาสตร์ใต้น้ำ", building: "ชั้น 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 47, oldName: "HYPCHM102", dept: "เวชศาสตร์ใต้น้ำ", building: "ชั้น 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 48, oldName: "SKPS103", dept: "คลังเวชภัณฑ์ยา", building: "ชั้น B", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 49, oldName: "SKPS105", dept: "คลังเวชภัณฑ์ยา", building: "ชั้น B", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 50, oldName: "SKPS104", dept: "คลังเวชภัณฑ์ยา", building: "ชั้น B", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 51, oldName: "SURG-F-01", dept: "ศัลยกรรมหญิง", building: "ชั้น 1", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 52, oldName: "saline106", dept: "โรงน้ำเกลือ", building: "ชั้น 6", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 53, oldName: "SALINE103", dept: "โรงน้ำเกลือ", building: "ชั้น 6", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 54, oldName: "SUPPLY104", dept: "งานจ่ายกลาง", building: "ชั้น 8", round: "รอบ 2", date: "11-12 มิ.ย" },
  { id: 55, oldName: "MED-M3-303", dept: "อายุรกรรมชาย", building: "ชั้น 3", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 56, oldName: "MED-M3-302", dept: "อายุรกรรมชาย", building: "ชั้น 3", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 57, oldName: "ANDAMAN204", dept: "อายุรกรรมชาย", building: "ชั้น 3", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 58, oldName: "ANDAMAN301", dept: "อายุรกรรมหญิง", building: "ชั้น 5", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 59, oldName: "ROMSAI-05", dept: "ร่มไทร", building: "ชั้น 6", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 60, oldName: "MED298-703", dept: "อายุรกรรม 7", building: "ชั้น 7", round: "รอบแรก", date: "11-12 มิ.ย" },
  { id: 61, oldName: "ANDAMAN402", dept: "พิเศษ 4", building: "ชั้น 8", round: "รอบแรก", date: "11-12 มิ.ย" },
  // Sheet: 15-16 มิ.ย
  { id: 62, oldName: "kp-lab102", dept: "LAB คุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 63, oldName: "KP-XRAY105", dept: "X-RAY คุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 64, oldName: "KP-PSY-01", dept: "จิตเวชเด็ก", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 65, oldName: "KP-PSY-077", dept: "จิตเวชเด็ก", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 66, oldName: "KP-PHR104", dept: "ห้องจ่ายยา คุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 67, oldName: "KP-PHR101", dept: "ห้องจ่ายยา คุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 68, oldName: "KP-PHR102", dept: "ห้องจ่ายยา คุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 69, oldName: "KP-OPD04", dept: "ห้องบัตรคุณพุ่ม", building: "คุณพุ่ม 1", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 70, oldName: "KP-IC103", dept: "IC", building: "คุณพุ่ม 2", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 71, oldName: "KP-IC104", dept: "IC", building: "คุณพุ่ม 2", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 72, oldName: "Palliative210", dept: "Palliative Care", building: "คุณพุ่ม 2", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 73, oldName: "kp-rehab101", dept: "กายภาพ คุณพุ่ม", building: "คุณพุ่ม 2", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 74, oldName: "KP-PED1-01", dept: "กุมารเวช 1", building: "คุณพุ่ม 3", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 75, oldName: "KP-PED304", dept: "กุมารเวช 1", building: "คุณพุ่ม 3", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 76, oldName: "KP-EENT02", dept: "EENT", building: "คุณพุ่ม 3", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 77, oldName: "KP-PICU401", dept: "PICU", building: "คุณพุ่ม 4", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 78, oldName: "KP-PICU402", dept: "PICU", building: "คุณพุ่ม 4", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 79, oldName: "COMNURSE511", dept: "พยาบาลชุมชน", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 80, oldName: "KP-COMNURSE501", dept: "พยาบาลชุมชน", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 81, oldName: "SOCIALNURSE501", dept: "พยาบาลชุมชน", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 82, oldName: "NURSE01", dept: "ฝ่ายการพยาบาล", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 83, oldName: "KP-SOCIALMED617", dept: "ฝ่ายการพยาบาล", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 84, oldName: "KP-NURSE501", dept: "ฝ่ายการพยาบาล", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 85, oldName: "NURSE02", dept: "ฝ่ายการพยาบาล", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 86, oldName: "admin-namtip", dept: "งานธุรการ", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 87, oldName: "KP-ADMIN502", dept: "ฝ่ายการเจ้าหน้าที่", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 88, oldName: "SECRET102", dept: "ฝ่ายการเจ้าหน้าที่", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 89, oldName: "ADMIN09", dept: "ฝ่ายการเจ้าหน้าที่", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 90, oldName: "KP-ASSIS507", dept: "สำนักเลขา", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 91, oldName: "KP-ACCOUNT15", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 92, oldName: "KP-ACCOUNT08", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 93, oldName: "KP-ACCOUNT01", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 94, oldName: "KP-ACCOUNT09", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 95, oldName: "KP-ACCOUNT18", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 96, oldName: "KP-ACCOUNT19", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 97, oldName: "KP-ACCOUNT20", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 98, oldName: "KP-ACCOUNT21", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 99, oldName: "KP-ACCOUNT22", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 100, oldName: "KP-ACCOUNT502", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 101, oldName: "KP-ACCOUNT503", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 102, oldName: "KP-ACCOUNT505", dept: "การเงิน", building: "คุณพุ่ม 5", round: "รอบ 2", date: "15-16 มิ.ย" },
  { id: 103, oldName: "KP-HSS01", dept: "พรส.", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 104, oldName: "HA03", dept: "พรส.", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 105, oldName: "KP-VCR504", dept: "พรส.", building: "คุณพุ่ม 5", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 106, oldName: "KP-DRTAP501", dept: "งานจริยธรรมและวิจัย", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 107, oldName: "KP-SOCIALMED625", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 108, oldName: "KP-SOCIALMED607", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 109, oldName: "KP-SOCIALMED619", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 110, oldName: "KP-SOCIALMED609", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 111, oldName: "KP-SOCIALMED621", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 112, oldName: "KP-SOCIALMED601", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 113, oldName: "KP-SOCIALMED604", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 114, oldName: "KP-SOCIALMED624", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  { id: 115, oldName: "KP-SOCIALMED632", dept: "เวชกรรมสังคม", building: "คุณพุ่ม 6", round: "รอบแรก", date: "15-16 มิ.ย" },
  // Sheet: 17-19 มิ.ย
  { id: 116, oldName: "ems02", dept: "EMS นเรนทร", building: "OPD 1", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 117, oldName: "EMS105", dept: "EMS นเรนทร", building: "OPD 1", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 118, oldName: "EMS01", dept: "EMS นเรนทร", building: "OPD 1", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 119, oldName: "EMS101", dept: "EMS นเรนทร", building: "OPD 1", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 120, oldName: "RTADMIT101", dept: "จุด admit", building: "OPD 1", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 121, oldName: "RTADMIT102", dept: "จุด admit", building: "OPD 1", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 122, oldName: "CAREGIVER02", dept: "จุด admit", building: "OPD 1", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 123, oldName: "CRISIS103", dept: "ศูนย์พึ่งได้", building: "OPD 1", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 124, oldName: "CRISIS101", dept: "ศูนย์พึ่งได้", building: "OPD 1", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 125, oldName: "DR-ECHO201", dept: "Echo", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 126, oldName: "HEART-CENTER102", dept: "Echo", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 127, oldName: "GYN-DR205", dept: "ห้องตรวจนรีเวช", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 128, oldName: "officeopd", dept: "สำนักงาน OPD", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 129, oldName: "PHARM-WARFARIN202", dept: "ห้องยา opd2", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 130, oldName: "Room-DRMED202", dept: "ห้องตรวจอายุรกรรม", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 131, oldName: "DR-MED208", dept: "ห้องตรวจอายุรกรรม", building: "OPD 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 132, oldName: "SURG-NURSE301", dept: "คลีนิกศัลยกรรม", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 133, oldName: "PSYCHO-SCREEN05", dept: "จิตเวช", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 134, oldName: "PSYCHO302", dept: "จิตเวช opd3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 135, oldName: "PHARM-OPD302", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 136, oldName: "PHARM-OPD303", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 137, oldName: "PHARM-OPD316", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 138, oldName: "KO-ROJ", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 139, oldName: "PHARM-ADM305", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 140, oldName: "PHARM-admin3012", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 141, oldName: "PHARM-ARV303", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 142, oldName: "Pharm-OPD301", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 143, oldName: "pharm-opd305", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 144, oldName: "PHARMOPD306", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 145, oldName: "Pharm-opd401", dept: "ห้องจ่ายยา ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 146, oldName: "SKPH555", dept: "บริหารเวชภัณฑ์ยา", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 147, oldName: "DR-PSYCHO301", dept: "ห้องตรวจจิตเวช", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 148, oldName: "PSYCHO315", dept: "ห้องตรวจจิตเวช", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 149, oldName: "Dr-psycho302", dept: "ห้องตรวจจิตเวช", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 150, oldName: "DR-SURG313", dept: "ห้องตรวจหมอ ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 151, oldName: "DR-CVT302", dept: "ห้องตรวจหมอ ชั้น 3", building: "OPD 3", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 152, oldName: "BLOODBANK407", dept: "ธนาคารเลือด", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 153, oldName: "BLOODBANK401", dept: "ธนาคารเลือด", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 154, oldName: "BLOODBANK4061", dept: "ธนาคารเลือด", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 155, oldName: "BLOODBANK412", dept: "ธนาคารเลือด", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 156, oldName: "LT-BLOODBANK777", dept: "ธนาคารเลือด", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 157, oldName: "DENTAL131-PC", dept: "คลีนิกทันตกรรม", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 158, oldName: "ENT-402", dept: "หู คอ จมูก", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 159, oldName: "DR-EYEROOM1", dept: "ห้องตรวจตา", building: "OPD4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 160, oldName: "DR-EYE403", dept: "ห้องตรวจหมอตา", building: "OPD 4", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 161, oldName: "EYE407", dept: "ห้องตา", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 162, oldName: "eye409", dept: "ห้องตา", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 163, oldName: "EYE404", dept: "ห้องตา", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 164, oldName: "EYE405", dept: "ห้องตา", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 165, oldName: "EYE403", dept: "ห้องตา", building: "OPD 4", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 166, oldName: "OR-COUNTER501", dept: "ห้องผ่าตัด ชั้น 5", building: "OPD 5", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 167, oldName: "Operation506", dept: "ห้องผ่าตัด ชั้น 5", building: "OPD 5", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 168, oldName: "ANES603", dept: "วิสัญญี", building: "OPD 6", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 169, oldName: "Operation601", dept: "ห้องผ่าตัด ชั้น 6", building: "OPD 6", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 170, oldName: "OR-601", dept: "ห้องผ่าตัด ชั้น 6", building: "OPD 6", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 171, oldName: "OR-counter601", dept: "ห้องผ่าตัด ชั้น 6", building: "OPD 6", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 172, oldName: "LAB601", dept: "พยาธิวิทยา", building: "ดาดฟ้า", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 173, oldName: "ARI-SCREEN03", dept: "ARI", building: "ลานม่วงขาว", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 174, oldName: "DR-ARI777", dept: "ARI", building: "ลานม่วงขาว", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 175, oldName: "dr-ari103", dept: "ARI", building: "ลานม่วงขาว", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 176, oldName: "SN-XRAY01", dept: "ARI", building: "ลานม่วงขาว", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 177, oldName: "Mahoganee106", dept: "คลีนิกมะฮอกกานี", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 178, oldName: "HPMahok101", dept: "คลีนิกมะฮอกกานี", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 179, oldName: "RTSS0105", dept: "ประกันสังคม", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 180, oldName: "RTUC103", dept: "ประกันสังคม", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 181, oldName: "rtinsur105", dept: "พรบ. โลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 182, oldName: "RTINSUR107", dept: "พรบ. โลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 183, oldName: "RTINSUR101", dept: "พรบ. โลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 184, oldName: "rtuc105", dept: "ประกันสังคม", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 185, oldName: "RTUC1141", dept: "ประกันสุขภาพ", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 186, oldName: "PHARM-OPD211", dept: "ห้องยาโลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 187, oldName: "PHARM-OPD209", dept: "ห้องยาโลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 188, oldName: "Pharm-opd102", dept: "ห้องยาโลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 189, oldName: "PHARM-OPD206", dept: "ห้องยาโลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 190, oldName: "PHARM-OPD210", dept: "ห้องยาโลมา", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 191, oldName: "CARD107", dept: "ห้องบัตร", building: "โลมา", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 192, oldName: "LAB-FR1011", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 193, oldName: "LAB-UA105", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 194, oldName: "LAB-UA101", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 195, oldName: "CPR04", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 196, oldName: "LAB-BA101", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 197, oldName: "LAB-CY102", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 198, oldName: "LAB-FR105", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 199, oldName: "LAB-FR106", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 200, oldName: "LAB-HE101", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 201, oldName: "LAB-HE201", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 202, oldName: "LAB-TB02", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 203, oldName: "LAB-UA104", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 204, oldName: "OUTLAB101-PC", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 205, oldName: "BPL-102032", dept: "LAB", building: "อำนวยการ 2", round: "รอบ 2", date: "17-19 มิ.ย" },
  { id: 206, oldName: "TB203", dept: "วัณโรค", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 207, oldName: "OPD-CONSULT201", dept: "ห้องให้คำปรึกษา", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 208, oldName: "AVR02", dept: "งานเอดส์", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 209, oldName: "AIDS203", dept: "งานเอดส์", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 210, oldName: "AIDS202", dept: "งานเอดส์", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
  { id: 211, oldName: "INFROM103", dept: "ประชาสัมพันธ์", building: "อำนวยการ 2", round: "รอบแรก", date: "17-19 มิ.ย" },
];

const ROTATING_COMPUTERS = [
  { id: "r1", oldName: "INFROM-OPD", dept: "สุขศึกษา", building: "หลัง Xray" },
  { id: "r2", oldName: "OR5-EMDOSMART", dept: "ห้องผ่าตัด 5", building: "OPD 5" },
  { id: "r3", oldName: "KP-VMO605", dept: "องค์กรแพทย์", building: "คุณพุ่ม 6" },
  { id: "r4", oldName: "YT-DOCTOR301", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r5", oldName: "YT-PCU406", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r6", oldName: "YT-PCU407", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r7", oldName: "YT-PH101", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r8", oldName: "YT-PH401", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r9", oldName: "YT-REHAB201", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r10", oldName: "YT-SCREEN102", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r11", oldName: "YT-SCREEN106", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r12", oldName: "YT-STOREDENT", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r13", oldName: "sparetest101", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r14", oldName: "PCU-GYN303", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r15", oldName: "PCU-PH102", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r16", oldName: "PCU-REHAB201", dept: "หยี่เต้ง", building: "หยี่เต้ง" },
  { id: "r17", oldName: "CHC_REGISTER101", dept: "ห้องบัตร", building: "หลวงพ่อแช่ม 1" },
  { id: "r18", oldName: "CHC-ORS101", dept: "SMC คลินิกพิเศษ", building: "หลวงพ่อแช่ม 1" },
  { id: "r19", oldName: "CATHLAB99", dept: "CathLab", building: "ทรอม่า 5" },
  { id: "r20", oldName: "Cleaning101", dept: "งานซักฟอก", building: "จอดรถ 7" },
  { id: "r21", oldName: "lectronic02", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r22", oldName: "ELECTRONIC101", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r23", oldName: "ELECTRONIC103", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r24", oldName: "MEC201", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r25", oldName: "MEDICAL-TOOL101", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r26", oldName: "MEDTOOL601", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r27", oldName: "TECH03", dept: "ศูนย์เครื่องมือแพทย์", building: "จอดรถ 6" },
  { id: "r28", oldName: "MEC-PK01", dept: "ศูนย์แพทย์", building: "ศูนย์แพทย์" },
  { id: "r29", oldName: "KP-VOM305", dept: "องค์กรแพทย์", building: "คุณพุ่ม 6" },
  { id: "r30", oldName: "VIP01", dept: "VIP", building: "อำนวยการ 2" },
  { id: "r31", oldName: "VIPCSR1033", dept: "VIP", building: "อำนวยการ 2" },
  { id: "r32", oldName: "SCANCenter001", dept: "ห้องบัตรล่าง", building: "ใต้ถุน" },
  { id: "r33", oldName: "SCANCENTER003", dept: "ห้องบัตรล่าง", building: "ใต้ถุน" },
  { id: "r34", oldName: "STAT-OPD104", dept: "ห้องบัตร", building: "ใต้ถุน" },
  { id: "r35", oldName: "PHARM-Q101", dept: "ห้องยาโลมา", building: "อำนวยการ 1" },
  { id: "r36", oldName: "PH-COUNSEL101", dept: "ห้องให้คำปรึกษายา โลมา", building: "อำนวยการ 1" },
  { id: "r37", oldName: "Pharm-Dis102", dept: "ห้องให้คำปรึกษายา โลมา", building: "อำนวยการ 1" },
  { id: "r38", oldName: "PJ-CN202", dept: "ห้องให้คำปรึกษายา", building: "ปุดจ้อ 2" },
  { id: "r39", oldName: "PJ-CN203", dept: "ห้องให้คำปรึกษายา", building: "ปุดจ้อ 2" },
  { id: "r40", oldName: "RADIO-02", dept: "103 เรดิโอ", building: "อันดามัน 6" },
  { id: "r41", oldName: "RADIO-04", dept: "103 เรดิโอ", building: "อันดามัน 6" },
  { id: "r42", oldName: "SN05", dept: "103 เรดิโอ", building: "อันดามัน 6" },
  { id: "r43", oldName: "Transport101", dept: "โรงรถ", building: "คุณพุ่ม B" },
  { id: "r44", oldName: "VCiT02", dept: "งานเวชนิทัศน์", building: "ศูนย์คอม" },
  { id: "r45", oldName: "Kitchen02", dept: "โรงครัว", building: "จอดรถ 9" },
  { id: "r46", oldName: "KITCHEN03", dept: "โรงครัว", building: "จอดรถ 9" },
  { id: "r47", oldName: "kitchen04", dept: "โรงครัว", building: "จอดรถ 9" },
  { id: "r48", oldName: "KITCHEN05", dept: "โรงครัว", building: "จอดรถ 9" },
  { id: "r49", oldName: "KP-DEPADMIN501", dept: "ช่างซ่อมบำรุง", building: "โรงขยะ" },
  { id: "r50", oldName: "MAINTENANCE03", dept: "ช่างซ่อมบำรุง", building: "โรงขยะ" },
  { id: "r51", oldName: "MAINTENANCE05", dept: "ช่างซ่อมบำรุง", building: "โรงขยะ" },
  { id: "r52", oldName: "KP-OPD04", dept: "ห้องบัตรคุณพุ่ม", building: "คุณพุ่ม 1" },
  { id: "r53", oldName: "KP-CARD101", dept: "ห้องบัตรคุณพุ่ม", building: "คุณพุ่ม 1" },
  { id: "r54", oldName: "KP-STORE503", dept: "พัสดุ", building: "คุณพุ่ม 5" },
  { id: "r55", oldName: "CRM112", dept: "ศูนย์ต่างประเทศ", building: "ใต้ถุน อำนวยการ" },
  { id: "r56", oldName: "CRM-OPD125", dept: "ศูนย์ต่างประเทศ", building: "ใต้ถุน อำนวยการ" },
  { id: "r57", oldName: "kp-Asst-01", dept: "ศูนย์แพทย์ จี้รุน", building: "ศูนย์แพทย์" },
  { id: "r58", oldName: "Labqing", dept: "LAB SERVER", building: "อำนวยการ 2" },
  { id: "r59", oldName: "LIS-PC", dept: "LAB SERVER", building: "อำนวยการ 2" },
];

const STATUSES = ["ยังไม่เริ่ม", "Backup แล้ว", "พร้อมติดตั้ง", "ติดตั้งแล้ว", "ส่งมอบแล้ว", "มีปัญหา"];
const DATES = ["ทั้งหมด", "11-12 มิ.ย", "15-16 มิ.ย", "17-19 มิ.ย"];
const ROUNDS = ["ทั้งหมด", "รอบแรก", "รอบ 2"];

const STATUS_COLORS = {
  "ยังไม่เริ่ม": { bg: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" },
  "Backup แล้ว": { bg: "#eff6ff", text: "#3b82f6", border: "#bfdbfe" },
  "พร้อมติดตั้ง": { bg: "#fefce8", text: "#ca8a04", border: "#fde68a" },
  "ติดตั้งแล้ว": { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  "ส่งมอบแล้ว": { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  "มีปัญหา": { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
};

const STORAGE_KEY = "hospital_computer_statuses_v2";

function loadStatuses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function saveStatuses(statuses) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)); } catch {}
}

export default function App() {
  const [activeTab, setActiveTab] = useState("main");
  const [filterDate, setFilterDate] = useState("ทั้งหมด");
  const [filterRound, setFilterRound] = useState("ทั้งหมด");
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState(loadStatuses);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newNames, setNewNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hospital_newnames_v2") || "{}"); } catch { return {}; }
  });

  function getStatus(id) { return statuses[id] || "ยังไม่เริ่ม"; }
  function getNewName(id) { return newNames[id] || ""; }

  function updateStatus(id, status) {
    const updated = { ...statuses, [id]: status };
    setStatuses(updated);
    saveStatuses(updated);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setEditForm({ status: getStatus(item.id), newName: getNewName(item.id) });
  }

  function saveEdit() {
    const updated = { ...statuses, [editingId]: editForm.status };
    setStatuses(updated);
    saveStatuses(updated);
    const updatedNames = { ...newNames, [editingId]: editForm.newName };
    setNewNames(updatedNames);
    try { localStorage.setItem("hospital_newnames_v2", JSON.stringify(updatedNames)); } catch {}
    setEditingId(null);
  }

  const filtered = useMemo(() => {
    return COMPUTERS_RAW.filter(c => {
      if (filterDate !== "ทั้งหมด" && c.date !== filterDate) return false;
      if (filterRound !== "ทั้งหมด" && c.round !== filterRound) return false;
      const s = getStatus(c.id);
      if (filterStatus !== "ทั้งหมด" && s !== filterStatus) return false;
      if (search && !c.oldName.toLowerCase().includes(search.toLowerCase()) &&
          !c.dept.includes(search) && !c.building.includes(search)) return false;
      return true;
    });
  }, [filterDate, filterRound, filterStatus, search, statuses]);

  const stats = useMemo(() => {
    const counts = {};
    STATUSES.forEach(s => counts[s] = 0);
    COMPUTERS_RAW.forEach(c => { counts[getStatus(c.id)]++; });
    return counts;
  }, [statuses]);

  const doneCount = (stats["ติดตั้งแล้ว"] || 0) + (stats["ส่งมอบแล้ว"] || 0);
  const total = COMPUTERS_RAW.length;
  const pct = Math.round((doneCount / total) * 100);

  const dateStats = useMemo(() => {
    const ds = {};
    DATES.slice(1).forEach(d => {
      const group = COMPUTERS_RAW.filter(c => c.date === d);
      const done = group.filter(c => ["ติดตั้งแล้ว","ส่งมอบแล้ว"].includes(getStatus(c.id))).length;
      ds[d] = { total: group.length, done };
    });
    return ds;
  }, [statuses]);

  const s = {
    wrap: { fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", background: "#f8fafc", minHeight: "100vh" },
    header: { background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 60%, #2563eb 100%)", color: "#fff", padding: "20px 24px 16px" },
    headerTitle: { fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.3px" },
    headerSub: { fontSize: 13, opacity: 0.8, marginTop: 4 },
    tabs: { display: "flex", gap: 0, background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 16px" },
    tab: (active) => ({ padding: "10px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#1d4ed8" : "#64748b", borderBottom: active ? "2px solid #1d4ed8" : "2px solid transparent", transition: "all 0.15s" }),
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, padding: "14px 16px 0" },
    statCard: (color) => ({ background: color.bg, border: `1px solid ${color.border}`, borderRadius: 10, padding: "10px 14px" }),
    statLabel: { fontSize: 11, color: "#64748b", marginBottom: 2 },
    statNum: (color) => ({ fontSize: 24, fontWeight: 800, color: color.text, lineHeight: 1 }),
    progressBar: { margin: "12px 16px", background: "#e2e8f0", borderRadius: 99, height: 10, overflow: "hidden" },
    progressFill: { height: "100%", background: "linear-gradient(90deg, #16a34a, #22c55e)", borderRadius: 99, transition: "width 0.5s ease" },
    filters: { padding: "12px 16px 0", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
    select: { padding: "6px 10px", borderRadius: 7, border: "1px solid #cbd5e1", fontSize: 13, background: "#fff", color: "#1e293b", cursor: "pointer" },
    searchInput: { padding: "6px 10px", borderRadius: 7, border: "1px solid #cbd5e1", fontSize: 13, background: "#fff", flex: 1, minWidth: 160, outline: "none" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
    th: { background: "#f1f5f9", padding: "8px 10px", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: 12, borderBottom: "2px solid #e2e8f0", whiteSpace: "nowrap" },
    td: { padding: "8px 10px", borderBottom: "1px solid #f1f5f9", color: "#1e293b", verticalAlign: "middle" },
    badge: (status) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: STATUS_COLORS[status]?.bg || "#f3f4f6", color: STATUS_COLORS[status]?.text || "#6b7280", border: `1px solid ${STATUS_COLORS[status]?.border || "#e5e7eb"}` }),
    editBtn: { padding: "3px 10px", fontSize: 12, border: "1px solid #93c5fd", borderRadius: 6, background: "#eff6ff", color: "#1d4ed8", cursor: "pointer", fontWeight: 600 },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 },
    modalBox: { background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
    modalTitle: { fontWeight: 700, fontSize: 16, marginBottom: 16, color: "#1e293b" },
    label: { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 },
    input: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 12 },
    btnRow: { display: "flex", gap: 8, marginTop: 4 },
    btnSave: { flex: 1, padding: "9px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" },
    btnCancel: { flex: 1, padding: "9px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#f8fafc", color: "#64748b", fontWeight: 600, fontSize: 14, cursor: "pointer" },
    dateCard: { background: "#fff", borderRadius: 12, padding: "14px 16px", margin: "10px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" },
  };

  const editingItem = COMPUTERS_RAW.find(c => c.id === editingId);

  function exportCSV() {
    const rows = [["#","ชื่อเดิม","ชื่อใหม่","หน่วยงาน","อาคาร","วันที่","รอบ","สถานะ"]];
    COMPUTERS_RAW.forEach(c => {
      rows.push([c.id, c.oldName, getNewName(c.id), c.dept, c.building, c.date, c.round, getStatus(c.id)]);
    });
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "computer_deployment.csv"; a.click();
  }

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={s.headerTitle}>💻 ระบบติดตามการเปลี่ยนเครื่องคอมพิวเตอร์</p>
            <p style={s.headerSub}>โรงพยาบาล · เครื่องหลัก {total} เครื่อง + หมุนเวียน {ROTATING_COMPUTERS.length} เครื่อง</p>
          </div>
          <button onClick={exportCSV} style={{ padding: "7px 14px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>⬇ Export</button>
        </div>
        {/* Overall progress */}
        <div style={{ marginTop: 14, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span>ความคืบหน้าโดยรวม</span>
            <span style={{ fontWeight: 700 }}>{doneCount}/{total} ({pct}%)</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.3)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#22c55e", borderRadius: 99, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {[["main", "📋 รายการหลัก"], ["rotating", "🔄 หมุนเวียน"], ["summary", "📊 สรุป"]].map(([k, l]) => (
          <button key={k} style={s.tab(activeTab === k)} onClick={() => setActiveTab(k)}>{l}</button>
        ))}
      </div>

      {/* Main Tab */}
      {activeTab === "main" && (
        <div>
          {/* Stats */}
          <div style={s.statsGrid}>
            {STATUSES.map(st => (
              <div key={st} style={s.statCard(STATUS_COLORS[st])}>
                <div style={s.statLabel}>{st}</div>
                <div style={s.statNum(STATUS_COLORS[st])}>{stats[st] || 0}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={s.filters}>
            <input style={s.searchInput} placeholder="🔍 ค้นหาชื่อเครื่อง / หน่วยงาน" value={search} onChange={e => setSearch(e.target.value)} />
            <select style={s.select} value={filterDate} onChange={e => setFilterDate(e.target.value)}>
              {DATES.map(d => <option key={d}>{d}</option>)}
            </select>
            <select style={s.select} value={filterRound} onChange={e => setFilterRound(e.target.value)}>
              {ROUNDS.map(r => <option key={r}>{r}</option>)}
            </select>
            <select style={s.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option>ทั้งหมด</option>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ padding: "10px 0 4px 16px", fontSize: 12, color: "#64748b" }}>แสดง {filtered.length} จาก {total} เครื่อง</div>

          {/* Table */}
          <div style={{ overflowX: "auto", margin: "0 0 20px" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>#</th>
                  <th style={s.th}>ชื่อเดิม</th>
                  <th style={s.th}>ชื่อใหม่</th>
                  <th style={s.th}>หน่วยงาน</th>
                  <th style={s.th}>อาคาร</th>
                  <th style={s.th}>วันที่</th>
                  <th style={s.th}>รอบ</th>
                  <th style={s.th}>สถานะ</th>
                  <th style={s.th}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} style={{ background: editingId === c.id ? "#f0f9ff" : "transparent" }}>
                    <td style={{ ...s.td, color: "#94a3b8", fontSize: 12 }}>{c.id}</td>
                    <td style={{ ...s.td, fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{c.oldName}</td>
                    <td style={{ ...s.td, fontSize: 12, color: getNewName(c.id) ? "#1d4ed8" : "#cbd5e1" }}>{getNewName(c.id) || "—"}</td>
                    <td style={s.td}>{c.dept}</td>
                    <td style={{ ...s.td, whiteSpace: "nowrap" }}>{c.building}</td>
                    <td style={{ ...s.td, whiteSpace: "nowrap", fontSize: 12, color: "#64748b" }}>{c.date}</td>
                    <td style={{ ...s.td, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 99, background: c.round === "รอบแรก" ? "#f0fdf4" : "#fef3c7", color: c.round === "รอบแรก" ? "#15803d" : "#b45309", border: `1px solid ${c.round === "รอบแรก" ? "#bbf7d0" : "#fde68a"}`, fontWeight: 600 }}>{c.round}</span>
                    </td>
                    <td style={s.td}><span style={s.badge(getStatus(c.id))}>{getStatus(c.id)}</span></td>
                    <td style={s.td}><button style={s.editBtn} onClick={() => openEdit(c)}>แก้ไข</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rotating Tab */}
      {activeTab === "rotating" && (
        <div>
          <div style={{ padding: "12px 16px 4px", fontSize: 13, color: "#64748b" }}>คอมพิวเตอร์หมุนเวียน {ROTATING_COMPUTERS.length} เครื่อง (ไม่รวมในสถิติหลัก)</div>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>#</th>
                  <th style={s.th}>ชื่อเดิม</th>
                  <th style={s.th}>หน่วยงาน</th>
                  <th style={s.th}>อาคาร</th>
                  <th style={s.th}>สถานะ</th>
                  <th style={s.th}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {ROTATING_COMPUTERS.map((c, i) => (
                  <tr key={c.id}>
                    <td style={{ ...s.td, color: "#94a3b8", fontSize: 12 }}>{i + 1}</td>
                    <td style={{ ...s.td, fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{c.oldName}</td>
                    <td style={s.td}>{c.dept}</td>
                    <td style={s.td}>{c.building}</td>
                    <td style={s.td}><span style={s.badge(getStatus(c.id))}>{getStatus(c.id)}</span></td>
                    <td style={s.td}><button style={s.editBtn} onClick={() => openEdit(c)}>แก้ไข</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === "summary" && (
        <div style={{ padding: "12px 0 20px" }}>
          {DATES.slice(1).map(d => {
            const ds = dateStats[d];
            const dpct = Math.round((ds.done / ds.total) * 100);
            const group = COMPUTERS_RAW.filter(c => c.date === d);
            const deptMap = {};
            group.forEach(c => {
              if (!deptMap[c.dept]) deptMap[c.dept] = { total: 0, done: 0 };
              deptMap[c.dept].total++;
              if (["ติดตั้งแล้ว","ส่งมอบแล้ว"].includes(getStatus(c.id))) deptMap[c.dept].done++;
            });
            return (
              <div key={d} style={s.dateCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>📅 {d}</span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{ds.done}/{ds.total} เครื่อง ({dpct}%)</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 99, height: 7, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${dpct}%`, background: "linear-gradient(90deg,#16a34a,#22c55e)", borderRadius: 99 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                  {Object.entries(deptMap).map(([dept, v]) => (
                    <div key={dept} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: v.done === v.total && v.total > 0 ? "#f0fdf4" : "#f8fafc", borderRadius: 7, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: 12, color: "#374151" }}>{dept}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: v.done === v.total && v.total > 0 ? "#16a34a" : "#64748b" }}>{v.done}/{v.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editingItem && (
        <div style={s.modal} onClick={e => e.target === e.currentTarget && setEditingId(null)}>
          <div style={s.modalBox}>
            <div style={s.modalTitle}>✏️ แก้ไขสถานะ</div>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 12px", marginBottom: 16, fontSize: 13 }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#1d4ed8" }}>{editingItem.oldName}</span>
              <span style={{ color: "#64748b" }}> · {editingItem.dept} · {editingItem.building}</span>
            </div>
            <label style={s.label}>ชื่อเครื่องใหม่</label>
            <input style={s.input} placeholder="กรอกชื่อเครื่องใหม่ (ถ้ามี)" value={editForm.newName} onChange={e => setEditForm(f => ({ ...f, newName: e.target.value }))} />
            <label style={s.label}>สถานะการติดตั้ง</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {STATUSES.map(st => (
                <button key={st} onClick={() => setEditForm(f => ({ ...f, status: st }))}
                  style={{ padding: "8px", borderRadius: 8, border: `2px solid ${editForm.status === st ? STATUS_COLORS[st].text : STATUS_COLORS[st].border}`, background: STATUS_COLORS[st].bg, color: STATUS_COLORS[st].text, fontWeight: editForm.status === st ? 700 : 500, fontSize: 13, cursor: "pointer", transition: "all 0.1s" }}>
                  {st}
                </button>
              ))}
            </div>
            <div style={s.btnRow}>
              <button style={s.btnCancel} onClick={() => setEditingId(null)}>ยกเลิก</button>
              <button style={s.btnSave} onClick={saveEdit}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
