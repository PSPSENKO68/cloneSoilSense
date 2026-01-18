import fetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const BASE_URL = "https://portal-datahub-24vn-ews.education.wise-paas.com/api/v1";
const USERNAME = "ledinhkhanh.pt@gmail.com";
const PASSWORD = "28ed6735@Ss0";

const jar = new CookieJar();
const fetchWithCookies = fetchCookie(fetch, jar);

let accessToken = null;
let tokenCreatedAt = null;
const TOKEN_TTL = 60 * 50 * 1000; // 50 phút (token DataHub thường hết hạn sau 1h)

// === Hàm đăng nhập và lấy token ===
export const getToken = async () => {
    console.log("🔑 Đang đăng nhập để lấy token mới...");

    const res = await fetchWithCookies(`${BASE_URL}/Auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: USERNAME,
            password: PASSWORD,
        }),
    });

    if (!res.ok) throw new Error(`❌ Đăng nhập thất bại (${res.status})`);

    // Lấy tất cả cookie trả về
    const cookies = await jar.getCookies(BASE_URL);

    // Tìm cookie chứa token
    const tokenCookie = cookies.find(
        (c) => c.key.toLowerCase().includes("token") || c.key.toLowerCase().includes("auth")
    );

    if (tokenCookie) {
        accessToken = tokenCookie.value;
        tokenCreatedAt = Date.now();
        console.log("✅ Token mới lấy thành công:", accessToken.slice(0, 40) + "...");
        return accessToken;
    } else {
        throw new Error("⚠️ Không tìm thấy token trong cookie DataHub!");
    }
};

// === Hàm trả về token hiện tại hoặc refresh nếu hết hạn ===
export const getAccessToken = async () => {
    // Nếu chưa có token hoặc đã quá hạn → lấy lại
    if (
        !accessToken ||
        !tokenCreatedAt ||
        Date.now() - tokenCreatedAt > TOKEN_TTL
    ) {
        console.log("⏳ Token hết hạn hoặc chưa có, đang tạo mới...");
        return await getToken();
    }
    return accessToken;
};
