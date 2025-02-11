package dev.wenslo.wenslo_page.cookies;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

//@Component
//public class VisitorCookieFilter implements Filter {
//
//    private static final String COOKIE_NAME = "visitorId";
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//
//        if (request instanceof HttpServletRequest httpRequest &&
//                response instanceof HttpServletResponse httpResponse) {
//
//            Cookie[] cookies = httpRequest.getCookies();
//            Optional<Cookie> existingCookie = Optional.empty();
//
//            if (cookies != null) {
//                existingCookie = Arrays.stream(cookies)
//                        .filter(cookie -> COOKIE_NAME.equals(cookie.getName()))
//                        .findFirst();
//            }
//
//            if (existingCookie.isEmpty()) {
//                // Create a new visitor ID if the user doesn't have one
//                String visitorId = UUID.randomUUID().toString();
//                Cookie cookie = new Cookie(COOKIE_NAME, visitorId);
//                cookie.setMaxAge(30 * 24 * 60 * 60); // 30 days
//                cookie.setHttpOnly(true);
//                cookie.setSecure(true);
//                cookie.setPath("/");
//
//                httpResponse.addCookie(cookie);
//            }
//        }
//        chain.doFilter(request, response);
//    }
//}
