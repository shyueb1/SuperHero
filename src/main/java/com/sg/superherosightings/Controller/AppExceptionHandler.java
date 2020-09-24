package com.sg.superherosightings.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = InvalidObjectException.class)
    public ResponseEntity<Object> handleInvalidObjectException(InvalidObjectException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        AppException exception = new AppException(e.getMessage(), badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(value = NonUniqueObjectException.class)
    public ResponseEntity<Object> handleNonUniqueObjectException(NonUniqueObjectException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        AppException exception = new AppException(e.getMessage(), badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(value = FailedPersistenceException.class)
    public ResponseEntity<Object> handleFailedPersistenceException(FailedPersistenceException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        AppException exception = new AppException(e.getMessage(), badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleIncorrectJSONException(){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        AppException exception = new AppException("Incorrect JSON format. Could not parse entity.", badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handleIncorrectEndPointAccessException(){
        HttpStatus badRequest = HttpStatus.METHOD_NOT_ALLOWED;
        AppException exception = new AppException("No matching API end point was found.", badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(){
        HttpStatus badRequest = HttpStatus.INTERNAL_SERVER_ERROR;
        AppException exception = new AppException("Id doesn't match any existing entity.", badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }

    @ExceptionHandler(HttpMessageNotWritableException.class)
    public ResponseEntity<Object> handleHttpMessageNotWritableException(){
        HttpStatus badRequest = HttpStatus.INTERNAL_SERVER_ERROR;
        AppException exception = new AppException("Failed to retrieve objects from database. Incorrect Id was provided.", badRequest, LocalDateTime.now());
        return new ResponseEntity<>(exception, badRequest);
    }
}
