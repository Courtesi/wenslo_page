package dev.wenslo.wenslo_page.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GitHubParsingException extends RuntimeException {

    private final static Logger logger = LoggerFactory.getLogger(EmailNotValidException.class);

    public GitHubParsingException() {
        super("There was an error parsing the github string!");
//        logger.error("EXCEPTION ALERT!!!!: {} thrown\n", getClass());
    }
}
