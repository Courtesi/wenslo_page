package dev.wenslo.wenslo_page.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EmailNotValidException extends RuntimeException {

    private final static Logger logger = LoggerFactory.getLogger(EmailNotValidException.class);

    public EmailNotValidException() {
        super("The email you gave me is not valid you silly goose!!!");
//        logger.error("EXCEPTION ALERT!!!!: {} thrown\n", getClass());
    }
}
