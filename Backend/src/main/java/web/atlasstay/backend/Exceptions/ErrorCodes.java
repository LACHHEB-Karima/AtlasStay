package web.atlasstay.backend.Exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_IMPLEMENTED;

public enum ErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(300, BAD_REQUEST, "Current password is incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "The new password does not match"),
    ACCOUNT_LOCKED(302, FORBIDDEN, "User account is locked"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Login or Password is incorrect"),
    ROOM_NOT_FOUND(401, HttpStatus.NOT_FOUND, "Room not found"),
    USER_NOT_FOUND(401, HttpStatus.NOT_FOUND, "User not found"),
    BOOKING_NOT_FOUND(401, HttpStatus.NOT_FOUND, "Booking not found"),
    ROOM_NOT_AVAILABLE_FOR_THIS_PERIOD(402, HttpStatus.BAD_REQUEST, "Room not available for the selected period")
    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    ErrorCodes(int code, HttpStatus status, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = status;
    }
}