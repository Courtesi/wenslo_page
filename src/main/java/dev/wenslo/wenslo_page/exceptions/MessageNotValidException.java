package dev.wenslo.wenslo_page.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MessageNotValidException extends RuntimeException {

    private final static Logger logger = LoggerFactory.getLogger(EmailNotValidException.class);

    public MessageNotValidException() {
        super("DO NOT SEND ME AN INVALID MESSAGE EVER AGAIN!");
//        logger.error("EXCEPTION ALERT!!!!: {} thrown\n", getClass());
    }
}
