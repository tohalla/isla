package isla.security;

import java.util.Collection;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class AuthenticationToken extends AnonymousAuthenticationToken {
    public AuthenticationToken(String token,
            Collection<? extends GrantedAuthority> authorities) {
        super(token, token, authorities);
    }
    
    public String getName() {
        return null;
    }
}