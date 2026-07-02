package com.greenbox.decision;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Write side of the daily loop: the Decision (القرار), made before knowing
 * the outcome.
 * <p>
 * Each Decision is answered by Smart Analysis (التحليل الذكي) — a dialog that
 * reveals the detected bias, explains the financial concepts at play, and
 * shows the better alternative. Every Decision and detected bias is recorded
 * in the Decision Log (سجل القرارات), sharpens the Decision Lens (عدسة
 * القرار), and updates the Living Knowledge Profile that selects the next
 * boxes. The Smart Analysis engine integration is in progress; this endpoint
 * returns its response contract.
 */
@RestController
@RequestMapping("/api/decisions")
public class DecisionController {

    /** What the user decided — captured before the outcome is known. */
    public record DecisionRequest(String boxId, String chosenOption, String reasoning) {
    }

    /** Smart Analysis (التحليل الذكي) response for one Decision. */
    public record SmartAnalysis(String analysis, List<String> biasesDetected, List<String> concepts) {
    }

    @PostMapping
    public SmartAnalysis submit(@RequestBody DecisionRequest request) {
        return new SmartAnalysis(
                "Smart Analysis engine integration in progress",
                List.of(),
                List.of()
        );
    }
}
