package com.example.websocket.controller;

import com.example.websocket.service.ScheduledPushMessages;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.websocket.model.Greeting;
import com.example.websocket.model.HelloMessage;

@Controller
@RequiredArgsConstructor
public class GreetingController {
    private final ScheduledPushMessages scheduledPushMessages;
//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public void greeting(HelloMessage message) throws Exception {
//        scheduledPushMessages.sendMessage();
//    }

//    @Scheduled(fixedRate = 5000)
//    public void sendMessage() {
//        System.out.println("sehedules messs");
//        simpMessagingTemplate.convertAndSend("/topic/greetings",
//                new Greeting("Hello, " + HtmlUtils.htmlEscape("mallika") + "!"));
//    }
}
