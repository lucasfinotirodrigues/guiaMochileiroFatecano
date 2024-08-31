package br.org.ciag.gmf.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.gmf.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TermosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Termos.class);
        Termos termos1 = new Termos();
        termos1.setId(1L);
        Termos termos2 = new Termos();
        termos2.setId(termos1.getId());
        assertThat(termos1).isEqualTo(termos2);
        termos2.setId(2L);
        assertThat(termos1).isNotEqualTo(termos2);
        termos1.setId(null);
        assertThat(termos1).isNotEqualTo(termos2);
    }
}
