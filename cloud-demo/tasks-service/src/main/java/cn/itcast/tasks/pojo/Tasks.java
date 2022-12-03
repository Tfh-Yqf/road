package cn.itcast.tasks.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tasks {
    private int taskid;
    private String pname;
    private String rname;
    private int is_finish;
    private String title;
    private String details;
    private Date atime;
    private Date btime;
    private String address;
    private String road_name;
}
