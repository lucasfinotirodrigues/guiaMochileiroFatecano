package br.org.ciag.gmf.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.gmf.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ResumosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resumos.class);
        Resumos resumos1 = new Resumos();
        resumos1.setId(1L);
        Resumos resumos2 = new Resumos();
        resumos2.setId(resumos1.getId());
        assertThat(resumos1).isEqualTo(resumos2);
        resumos2.setId(2L);
        assertThat(resumos1).isNotEqualTo(resumos2);
        resumos1.setId(null);
        assertThat(resumos1).isNotEqualTo(resumos2);
    }
}
