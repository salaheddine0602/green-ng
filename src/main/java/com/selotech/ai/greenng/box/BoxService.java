package com.selotech.ai.greenng.box;

import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Serves today's Mystery Box.
 * <p>
 * Placeholder for the LLM+RAG scenario engine (Phase 1): scenarios will be
 * generated from the governed knowledge corpus and personalized against the
 * user's Decision Intelligence profile. Until then, one hardcoded box.
 */
@Service
public class BoxService {

    public MysteryBox todaysBox() {
        return new MysteryBox(
                "box-001",
                "debt-and-financing",
                "A personal financing offer \"made just for you\"",
                "Your bank sends you a pre-approved personal financing offer with an "
                        + "attractive monthly installment. The message insists the offer "
                        + "expires soon.",
                List.of(
                        "Accept it — an offer like this may not come again",
                        "Ignore it — you don't need financing right now",
                        "Calculate the real cost first (APR + total repayment), then decide"
                )
        );
    }
}
