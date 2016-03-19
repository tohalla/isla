package isla.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * Spring Security success handler, specialized for Ajax requests.
 */
@Component
public class JwtAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        String token = Jwts.builder().setSubject(authentication.getName()).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "placeholder").compact();
        response.getWriter().write("{\"token\": \"" + token + "\"}");
        response.getWriter().flush();
        response.getWriter().close();
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
