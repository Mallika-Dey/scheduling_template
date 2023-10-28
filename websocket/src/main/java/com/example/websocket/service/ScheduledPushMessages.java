package com.example.websocket.service;

import com.example.websocket.model.Greeting;
import com.example.websocket.model.HelloMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
@RequiredArgsConstructor
public class ScheduledPushMessages {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedRate = 5000)
    public void sendMessage() {
        System.out.println("sehedules 1");
        simpMessagingTemplate.convertAndSend("/topic/greetings",
                new Greeting("Hello, " + HtmlUtils.htmlEscape("mallika dey") + "!"));
    }
}
