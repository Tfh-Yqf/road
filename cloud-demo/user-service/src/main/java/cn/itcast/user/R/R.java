package cn.itcast.user.R;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.A;

import java.util.HashMap;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class R {
    private int code;
    private String message;
    Object data;

    public R(int code, String message){
        this.code = code;
        this.message = message;
    }

    public R(int code){
        this.code = code;
    }

}
