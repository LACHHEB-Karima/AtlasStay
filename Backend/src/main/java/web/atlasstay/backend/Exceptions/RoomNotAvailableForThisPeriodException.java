package web.atlasstay.backend.Exceptions;

public class RoomNotAvailableForThisPeriodException extends RuntimeException{
    public RoomNotAvailableForThisPeriodException(String message){
        super(message);
    }
}
