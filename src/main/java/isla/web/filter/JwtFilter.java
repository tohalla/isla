package isla.web.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import isla.domain.User;
import isla.repository.UserRepository;
import isla.security.UserAuthentication;

public class JwtFilter extends GenericFilterBean {
    private UserRepository userRepository;

    public JwtFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void doFilter(final ServletRequest req, final ServletResponse res,
            final FilterChain chain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) req;

        final String authHeader = request.getHeader("Authorization");
        if (!(authHeader == null || !authHeader.startsWith("Bearer "))) {
            final String token = authHeader.replace("Bearer", "");
            final Claims claims =
                    Jwts.parser().setSigningKey("placeholder").parseClaimsJws(token).getBody();
            final Optional<User> user = claims.getSubject() != null
                    ? userRepository.findOneByLogin(claims.getSubject()) : null;
            if (user.isPresent()) {
                SecurityContextHolder.getContext()
                        .setAuthentication(new UserAuthentication(user.get()));
                request.setAttribute("claims", claims);
            }
        }

        chain.doFilter(req, res);
    }

}
