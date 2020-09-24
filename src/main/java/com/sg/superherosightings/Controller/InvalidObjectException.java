package com.sg.superherosightings.Controller;

public class InvalidObjectException extends RuntimeException {

    public InvalidObjectException(String message) {
        super(message);
    }

    public InvalidObjectException(String message, Throwable cause) {
        super(message, cause);
    }
}
