package cn.itcast.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@lombok.Data
@AllArgsConstructor
@NoArgsConstructor
public class Data {
    private int infoid;
    private int taskid;
    private double latitude;
    private double longitude;
    private double speed;
    private double accuracy;
    private double altitude;
    private double verticalAccuracy;
    private double horizontalAccuracy;
    private String address;
    private String road_name;
    private String image;
}
