package com.selotech.ai.greenng.box;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Read side of the daily loop: fetch today's Mystery Box.
 */
@RestController
@RequestMapping("/api/boxes")
public class BoxController {

    private final BoxService boxService;

    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @GetMapping("/today")
    public MysteryBox today() {
        return boxService.todaysBox();
    }
}
