//package dev.wenslo.wenslo_page.cookies;
//
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Arrays;
//import java.util.Optional;
//import java.util.UUID;
//
//@RestController
//public class CookieController {
//
//    private static final String COOKIE_NAME = "visitorId";
//
//    @GetMapping("/cookie")
//    public String setVisitorCookie(HttpServletRequest request, HttpServletResponse response) {
//        // Check if the visitor already has a cookie
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            Optional<Cookie> existingCookie = Arrays.stream(cookies)
//                    .filter(cookie -> COOKIE_NAME.equals(cookie.getName()))
//                    .findFirst();
//
//            if (existingCookie.isPresent()) {
//                return "Welcome back! Your Visitor ID: " + existingCookie.get().getValue();
//            }
//        }
//
//        // Generate a unique ID for new visitors
//        String visitorId = UUID.randomUUID().toString();
//
//        // Create and set the cookie
//        Cookie cookie = new Cookie(COOKIE_NAME, visitorId);
//        cookie.setMaxAge(30 * 24 * 60 * 60); // Cookie lasts for 30 days
//        cookie.setHttpOnly(true); // Prevent JavaScript access (security)
//        cookie.setSecure(true); // Ensures cookie is sent only over HTTPS
//        cookie.setPath("/"); // Available for all pages
//
//        response.addCookie(cookie);
//
//        return "New visitor! Your unique Visitor ID: " + visitorId;
//    }
//}
