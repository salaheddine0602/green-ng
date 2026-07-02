package com.selotech.ai.greenng.decision;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Write side of the daily loop: the user decides and explains their reasoning.
 * <p>
 * Service skeleton awaiting the AI layer — the real implementation (Phase 1)
 * analyzes the decision against the governed RAG corpus, detects behavioral
 * biases, and feeds the Decision Intelligence profile. Until then, a stub.
 */
@RestController
@RequestMapping("/api/decisions")
public class DecisionController {

    /** What the user decided and, crucially, why. */
    public record DecisionRequest(String boxId, String chosenOption, String reasoning) {
    }

    /** The AI feedback for one decision. */
    public record DecisionAnalysis(String summary, List<String> biasesDetected) {
    }

    @PostMapping
    public DecisionAnalysis submit(@RequestBody DecisionRequest request) {
        return new DecisionAnalysis("AI analysis pending — engine arrives in Phase 1", List.of());
    }
}
