package isla.web.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import isla.domain.User;
import isla.repository.UserRepository;
import isla.security.AuthoritiesConstants;
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
        } else {
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS));
            if (authHeader == null || authHeader.length() == 0 || authHeader.equals("undefined")) {
                String uuid = UUID.randomUUID().toString();
                SecurityContextHolder.getContext().setAuthentication(
                        new AuthenticationToken(uuid, authorities));
            } else
                SecurityContextHolder.getContext().setAuthentication(
                        new AuthenticationToken(authHeader, authorities));
        }

        chain.doFilter(req, res);
    }
    
    private class AuthenticationToken extends AnonymousAuthenticationToken {
        public AuthenticationToken(String token,
                Collection<? extends GrantedAuthority> authorities) {
            super(token, token, authorities);
        }
        
        public String getName() {
            return null;
        }
    }

}
