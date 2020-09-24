package com.sg.superherosightings.Controller;

public class NonUniqueObjectException extends RuntimeException {

    public NonUniqueObjectException(String message){
        super(message);
    }

    public NonUniqueObjectException(String message, Throwable cause){
        super(message, cause);
    }
}
