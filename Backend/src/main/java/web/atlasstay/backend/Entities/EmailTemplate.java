package web.atlasstay.backend.Entities;

import lombok.Getter;

@Getter
public enum EmailTemplate {

    ACTIVATE_ACCOUNT("activate_account"),
    BOOKING_CONFIRMATION("booking_confirmation")
    ;


    private final String name;
    EmailTemplate(String name) {
        this.name = name;
    }
}
