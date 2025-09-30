package dev.wenslo.wenslo_page.exceptions;

//import dev.wenslo.wenslo_page.messages.MessageBoardController;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.logging.Logger;

@ControllerAdvice
public class GlobalExceptionHandler {

//    private static final Logger logger = Logger.getLogger(MessageBoardController.class.getName());

    @ExceptionHandler(EmailNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleEmailNotValidException(EmailNotValidException exception) {
//        logger.info("handling error for emails that aren't valid in globalexceptionhandler.");
        return new ErrorResponse(exception.getMessage());
    }

    @ExceptionHandler(MessageNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMessageNotValidException(MessageNotValidException exception) {
//        logger.info("message sent from create_message not valid in some way");
        return new ErrorResponse(exception.getMessage());
    }

    @ExceptionHandler(GitHubParsingException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public ErrorResponse handleGitHubParsingException(GitHubParsingException exception) {
//        logger.info("something went wrong with parsing the github api response");
        return new ErrorResponse(exception.getMessage());
    }

    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiErrorMessage> handleInvalidFieldsInValidJson(final RateLimitException rateLimitException, final HttpServletRequest request) {
        final ApiErrorMessage apiErrorMessage = rateLimitException.toApiErrorMessage(request.getRequestURI());
        return new ResponseEntity<>(apiErrorMessage, HttpStatus.TOO_MANY_REQUESTS);
    }
}
