package br.org.ciag.gmf.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.gmf.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjetosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Projetos.class);
        Projetos projetos1 = new Projetos();
        projetos1.setId(1L);
        Projetos projetos2 = new Projetos();
        projetos2.setId(projetos1.getId());
        assertThat(projetos1).isEqualTo(projetos2);
        projetos2.setId(2L);
        assertThat(projetos1).isNotEqualTo(projetos2);
        projetos1.setId(null);
        assertThat(projetos1).isNotEqualTo(projetos2);
    }
}
