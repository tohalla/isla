package isla.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import isla.domain.User;
import isla.repository.UserRepository;
import isla.security.AuthoritiesConstants;
import isla.security.UserAuthentication;
import isla.security.AuthenticationToken;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {
    @Inject
    private UserRepository userRepository;

    public static final String IP_ADDRESS = "IP_ADDRESS";

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket/")
            .setHandshakeHandler(new DefaultHandshakeHandler())
            .withSockJS()
            .setInterceptors(httpSessionHandshakeInterceptor());
    }

    @Bean
    public HandshakeInterceptor httpSessionHandshakeInterceptor() {
        return new HandshakeInterceptor() {

            @Override
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
                if (request instanceof ServletServerHttpRequest) {
                    ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
                    HttpSession session = servletRequest.getServletRequest().getSession(false);
                    attributes.put(IP_ADDRESS, servletRequest.getRemoteAddress());

                    String token = splitQuery(request.getURI()).get("token");
                    if (token.startsWith("Bearer ")) {
                        token = token.replace("Bearer", "").trim();
                        final Claims claims =
                                Jwts.parser().setSigningKey(Constants.signingKey).parseClaimsJws(token).getBody();
                        final Optional<User> user = claims.getSubject() != null
                                ? userRepository.findOneByLogin(claims.getSubject()) : null;
                        if (user.isPresent()) {
                            attributes.put("AUTHENTICATION", new UserAuthentication(user.get()));
                        }
                    } else {
                        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                        authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS));
                        attributes.put("AUTHENTICATION", new AuthenticationToken(token, authorities));
                    }
                }
                return true;
            }

            @Override
            public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                    WebSocketHandler wsHandler, Exception exception) {

            }
            
            private Map<String, String> splitQuery(URI url) throws UnsupportedEncodingException {
                Map<String, String> query_pairs = new LinkedHashMap<String, String>();
                String query = url.getQuery();
                String[] pairs = query.split("&");
                for (String pair : pairs) {
                    int idx = pair.indexOf("=");
                    query_pairs.put(URLDecoder.decode(pair.substring(0, idx), "UTF-8"), URLDecoder.decode(pair.substring(idx + 1), "UTF-8"));
                }
                return query_pairs;
            }
        };
    }
}
