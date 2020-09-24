package com.sg.superherosightings.Controller;

public class FailedPersistenceException extends RuntimeException{
    public FailedPersistenceException(String message, Throwable cause){
        super(message, cause);
    }

    public FailedPersistenceException(String message){
        super(message);
    }
}
